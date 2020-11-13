---
path: "/blog/build-serverless-graphql-api.md"
date: "2020-11-14"
title: "Build a Serverless GraphQL API on AWS [Tutorial]"
time: 7
cover: "/articles/build-serverless-graphql-api/1.jpg"
---

Serverless is a great way to build an API:
- It's easy
- It's cheap
- It's fast

Using the [Serverless Framework](https://www.serverless.com), you can build a cutting-edge API for your app. Coupled with **GraphQL**, you can deploy a powerful and scalable API to AWS, and that's what we are going to do today.

If you're not familiar with Serverless, I recommend you to read the [Serverless Handbook](https://serverlesshandbook.dev).

Here are the steps:
- Setup the Serverless Framework
- Test a lambda locally
- Setup GraphQL with Apollo Server
- Manage data through DynamoDB
- Deploy the serverless function to AWS

The full code of this tutorial is [available on GitHub](https://github.com/LucasLeRay/serverless-graphql-api-boilerplate), feel free to use it for your next project ! It's a more complete version, with **TypeScript**, **ESLint** and **Prettier**.  

---

## Prerequisites
To use the Serverless Framework and deploy to AWS, you have to do the following:
- [Setup an AWS account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)
- [Install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) and [configure it](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)
- Install the Serverless Framework globally with: `yarn global add serverless`

---

## Setup the Serverless Framework
First, init your **Node.JS** project:
```bash
yarn init
```

Then, add the Serverless configuration in `serverless.yml`:
```yml
service: serverless-api-example # the name of our service

provider:
  name: aws # we deploy to AWS
  runtime: nodejs12.x
  versionFunctions: false # disable function versioning
  region: us-east-1 # AWS region
  apiGateway:
    shouldStartNameWithService: true

functions:
  graphql:
    handler: src/graphql.handler # the lambda location
    events:
      - http:
          path: graphql # define lambda endpoint (${URL}/graphql)
          method: any # Any HTTP method can access this lambda
          cors: true # Enable CORS so you can access your API from anywhere
```
###### The full list of options is in the [Serverless Framework documentation](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/)

We gave Serverless the instructions to deploy our new service `serverless-api-example`. It has a single lambda: `graphql` and is accessible at `/graphql` through HTTP requests.

Let's create the `graphql` function, for the moment just put the following in `src/graphql.js`:
```javascript
exports.handler = () => {
  console.log('wow such api')
}
```

---

## Test a Serverless function in local
I recommend you to install the `serverless-offline` plugin to test your lambda locally:
```bash
yarn add -D serverless-offline
```
Add this at the end of `serverless.yml`:
```yml
plugins:
  - serverless-offline
```
And this script in `package.json`:
```json
{
  ...
  "scripts": {
    "start": "sls offline"
  }
}
```

Finally, enter `yarn start` and go to `localhost:3000/dev/graphql`:
```bash
> yarn start

offline: [HTTP] server ready: http://localhost:3000 🚀
offline: ANY /dev/graphql (λ: graphql)

wow such api # It works ! 🎉
```

Now that we created our Lambda, let's code its behavior !

---

## Setup a GraphQL Lambda with Apollo Server

`apollo-server-lambda` is a great way to build a GraphQL API in Serverless. Add it to your project:
```bash
yarn add -D apollo-server-lambda
```

Define the GraphQL schema in `src/schema.graphql`:
```graphql
type Query {
  item(id: ID!): Item
}

type Mutation {
  createItem(content: String!): Item
}

type Item {
  id: ID!
  content: String
}
```
We define a mutation `createItem`, which creates an item from a `content`, and a query `item` which gets it from an `id`.

Now, add the following to `src/graphql.js`:
```javascript
const fs = require('fs)
const { ApolloServer, gql } = require('apollo-server-lambda')

// get the GraphQL schema
const schema = fs.readFileSync('./src/schema.graphql', 'utf8')

// resolver functions
const resolvers = { 
  Query: {
    item: () => {},
  },

  Mutation: {
    createItem: () => {},
  }
};

const server = new ApolloServer({ typeDefs: schema, resolvers })

// launch the server at the lambda call
exports.handler = server.createHandler();
```
This code block will create an **Apollo** server and resolve the query from the request, using the `schema` and the `resolvers`. You can test it in `localhost:3000/dev/graphql`:
![Apollo server test](/articles/build-serverless-graphql-api/2.png)

As you can see, it works ! But our resolvers are not doing anything, that's why `item` is null.
The next step is to use real data from a database.

---

## Get data from DynamoDB with GraphQL
I recommend using AWS DynamoDB as a database because it's very easy to setup with `serverless.yml`, just add the following to the existing configuration:
```yml
provider:
  ...
  environment:
    ITEM_TABLE: ${self:service}-items-${self:provider.stage}
  iamRoleStatements:
    - Effect: Allow
      Action:
        - dynamodb:GetItem
        - dynamodb:PutItem
      Resource: 'arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.ITEM_TABLE}'

resources:
  Resources:
    ItemsTable:
      Type: 'AWS::DynamoDB::Table'
      Properties:
        AttributeDefinitions:
          - AttributeName: itemId
            AttributeType: S
        KeySchema:
          - AttributeName: itemId
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
        TableName: ${self:provider.environment.ITEM_TABLE}
```
We are asking Serverless to create a new table for `items` and to give us permissions to interact with it through `GetItem` and `PutItem`. More infos on the [Serverless documentation](https://www.serverless.com/dynamodb).

Now we can interact with our new DynamoDB table through the `aws-sdk`:
```
yarn add -D aws-sdk
```

We just have to update our resolvers. I recommend you to declare resolvers in different files, as it'll be more maintainable.
Here's our new `item` query:
```javascript
const AWS = require('aws-sdk')

async function item(_, { id }) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()

  const params = {
    TableName: process.env.ITEM_TABLE,
    Key: {
      itemId: input.id,
    },
  }

  const { Item } = await dynamoDb.get(params).promise()

  return {
    ...Item,
    id: Item.itemId,
  }
}
```
Then our new `createItem` mutation:
```javascript
const AWS = require('aws-sdk')
const { v4 } = require('uuid')

async function createItem(_, { content }) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()
  const id = v4()

  const params = {
    TableName: process.env.ITEM_TABLE,
    Item: {
      itemId: id,
      content: input.content,
    },
  }

  await dynamoDb.put(params).promise()

  return {
    ...input,
    id,
  }
}
```
As you can see, we need to install `uuid` in order to generate an id for the new item:
```
yarn add uuid
```

Your API is now working ! You can test it at `localhost:3000/dev/graphql`.

---

## Deploy an AWS Lambda with serverless framework

Deploy your Lambda to AWS is just one command away:
```bash
> serverless deploy

Serverless: Stack update finished...
endpoints: # your api endpoint !
  ANY - https://okak59wk56.execute-api.us-east-1.amazonaws.com/dev/graphql
```

Anyone can now access to your API (since you configured CORS this way), [Here's my version of the API](https://okak59wk56.execute-api.us-east-1.amazonaws.com/dev/graphql).  
![Test GraphQL API](/articles/build-serverless-graphql-api/3.png)

---

## Conclusion

Today you learnt:
- How to build a Serverless function
- How to test it locally
- How to build a GraphQL API on top of it
- How to deploy it as an AWS Lambda  

And there's more you can do:
- Add TypeScript for typing
- Add ESLint & Prettier for code readability
- Add authentification through AWS Cognito
- etc.  

If you liked this article, you can follow me on Twitter as a share a lot of things related to Serverless and GraphQL.
