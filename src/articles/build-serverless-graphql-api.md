---
path: "/blog/build-serverless-graphql-api"
date: "2020-11-14"
title: "Build a Serverless GraphQL API on AWS [Tutorial]"
time: 4
cover: "/articles/build-serverless-graphql-api/1.jpg"
---

**Serverless** is a scalable, fast and reliable architecture for APIs. By deploying your API to cloud providers such as **AWS**, you don't have to think about server administration, you just focus on code. Using the [Serverless framework](https://www.serverless.com), it becomes really easy as you can deploy a **Lambda function** in seconds.  

[GraphQL](https://graphql.org) is a query language simplifying client-server interactions. It's also very efficient thanks to its declarative data fetching. It's no surprise that [GitHub](https://github.blog/2016-09-14-the-github-graphql-api/), [Coursera](https://medium.com/coursera-engineering/evolving-the-graph-4c587a4ad9a8) or [AirBnB](https://medium.com/airbnb-engineering/how-airbnb-is-moving-10x-faster-at-scale-with-graphql-and-apollo-aa4ec92d69e2) are using it.

Today we're going to bring the best of both worlds, by building a **Serverless** **GraphQL** API and deploy it to **AWS** !

https://media.giphy.com/media/P4TqKx6NHyLnO/giphy.gif

Here are the steps:
- Setup the **Serverless** framework
- Test the Lambda locally
- Setup **GraphQL** with **Apollo Server**
- Manage data through **DynamoDB**
- Deploy the Lambda to **AWS**

The full code of this tutorial is [available on GitHub](https://github.com/LucasLeRay/serverless-graphql-api-boilerplate), feel free to use it for your next project ! It's a more complete version, with **TypeScript**, **ESLint** and **Prettier**.  

---

## Prerequisites
To use the **Serverless** framework and deploy to **AWS**, you have to do the following:
- [Setup an AWS account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)
- [Install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) and [configure it](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)
- Install the **Serverless** framework: `yarn global add serverless`

---

## Setup the Serverless framework
First, init your **Node.JS** project:
```bash
yarn init
```

Then, add the **Serverless** configuration in `serverless.yml`:
```yml
service: serverless-api-example # service name

provider:
  name: aws # deploy to AWS
  runtime: nodejs12.x
  versionFunctions: false # disable function versioning
  region: us-east-1 # AWS region
  apiGateway:
    shouldStartNameWithService: true

functions:
  graphql:
    handler: src/graphql.handler # Lambda handler path
    events:
      - http:
          path: graphql # define Lambda endpoint
          method: any # any HTTP method can access this Lambda
          cors: true # enable CORS
```
###### The full list of options is in the [Serverless framework documentation](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/)

We gave **Serverless** instructions to deploy our new service `serverless-api-example`. It has a Lambda called `graphql` and is accessible at `/graphql` through HTTP requests.

Let's create the handler for our Lambda, for the moment put the following in `src/graphql.js`:
```javascript
exports.handler = () => {
  console.log('wow such api')
}
```

---

## Test a Serverless function in local
I recommend you to install the `serverless-offline` plugin to test your Lambda locally:
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

# When going to http://localhost:3000/dev/graphql
wow such api # It works ! 🎉
```

Now that we created our Lambda, let's code its behavior !

---

## Setup a GraphQL Lambda with Apollo Server

`apollo-server-lambda` is a great way to build a **GraphQL** API in **Serverless**. Add it to your project:
```bash
yarn add -D apollo-server-lambda
```

Define the **GraphQL** schema in `src/schema.graphql`:
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
In the schema, We're defining what's an `Item`: an entity containing `id` and `content`. We also define a mutation `createItem`, which creates an item from a `content`, and a query `item` which gets it from an `id`. 

Now, add the following in `src/graphql.js`:
```javascript
const fs = require('fs')
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

// launch the server when the Lambda is called
exports.handler = server.createHandler();
```
This code will create an **Apollo** server and return a response, using the `schema` and the `resolvers`. You can test it in `localhost:3000/dev/graphql`:
![Apollo server test](/articles/build-serverless-graphql-api/2.png)

As you can see, it works ! But our resolvers don't do anything, that's why `item` is null.
The next step is to use real data from a database.

---

## Get data from DynamoDB with GraphQL
I recommend using **AWS DynamoDB** as a database because it's very easy to setup with `serverless.yml`. Add the following to the existing configuration:
```yml
provider:
  ...
  environment:
    ITEM_TABLE: ${self:service}-items-${self:provider.stage} # table name
  iamRoleStatements:
    - Effect: Allow # allow the Lambda to Get and Put Items of this table
      Action:
        - dynamodb:GetItem 
        - dynamodb:PutItem
      Resource: 'arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.ITEM_TABLE}'

resources:
  Resources:
    ItemsTable: # define the table
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
We are asking Serverless to create a new table for `items` and to give the Lambda the permissions to interact with it. More infos on the [Serverless documentation](https://www.serverless.com/dynamodb).

Now we can interact with our new **DynamoDB** table through the `aws-sdk`:
```bash
yarn add -D aws-sdk
```

All that remains is to update our resolvers. I recommend you to declare resolvers in different files, as it'll be more maintainable.
Here's our new `item` query:
```javascript
const AWS = require('aws-sdk')

async function item(_, { id }) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()

  const params = {
    TableName: process.env.ITEM_TABLE,
    Key: {
      itemId: id,
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
      content,
    },
  }

  await dynamoDb.put(params).promise()

  return {
    content,
    id,
  }
}
```
As you can see, we need to install `uuid` to generate an id for new `items`:
```bash
yarn add uuid
```

Your API is ready ! Let's deploy it to AWS.

---

## Deploy an AWS Lambda with serverless framework

Deploy your new Lambda to **AWS** is one command away:
```bash
> serverless deploy

Serverless: Stack update finished...
endpoints: # your api endpoint !
  ANY - https://okak59wk56.execute-api.us-east-1.amazonaws.com/dev/graphql
```

Anyone can now access your API (since you configured CORS this way). [Here's my version](https://okak59wk56.execute-api.us-east-1.amazonaws.com/dev/graphql).  
![Test GraphQL API](/articles/build-serverless-graphql-api/3.png)

---

## Conclusion

Today you learnt:
- How to build a Lambda
- How to test it locally
- How to build a **GraphQL** API on top of it
- How to deploy it to **AWS** using the **Serverless** framework

And there's more you can do:
- Add `updateItem` and `deleteItem` mutations
- Add **ESLint** & **Prettier** for code readability
- Use **TypeScript** instead of plain **Javascript**
- Add authentication with **AWS Cognito**
- etc.  

If you want to learn more about **Serverless**, I recommend you to read the [Serverless Handbook](https://serverlesshandbook.dev).

If you liked this article, you can [follow me on Twitter](http://twitter.com/intent/user?screen_name=Lucas_Le_Ray) as I share a lot of things related to **Serverless** and **GraphQL**.
