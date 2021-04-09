---
path: "/blog/real-time-tweets-analysis-aws"
date: "2021-03-24"
title: "Real time tweets analysis with AWS"
time: 6
cover: "/articles/real-time-tweets-analysis-aws/1.png"
---

As you know if you read my articles, I love building stuff with the Twitter API.    

Getting and analyzing tweets is very powerful, and yet so easy to do. In just a few lines of code I have access to a colossale amount of tweets. Such as this one, full of wisdom:

https://twitter.com/dabit3/status/1373969960062439431

But things get more complicated when it comes to real-world scenarios. For example, how do you do sentiment analysis in real time and in the cloud?

In this article, you'll learn how to take advantage of cloud providers to build such applications. More precisely, you are going to build a **Real-time Tweets sentiment analysis program with AWS** (Amazon Web Services).

The full code of this tutorial is **[available on GitHub](https://github.com/LucasLeRay/twitter-stream-aws)**, feel free to use it for your next project ! **(Don't forget the star 👀)**

---

## Prerequisites

To build such an application, you'll have to:

- [Setup an AWS account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)
- [Setup a Twitter Development account](https://developer.twitter.com/)

Also, basic knowledge of AWS and Python is expected

---

## Tweet streaming architecture in AWS

We want our application to do the following steps:

1. Connect to the **[Twitter Streaming API](https://developer.twitter.com/en/docs/tutorials/consuming-streaming-data)** and wait for new Tweets.
2. Send new Tweets to an **[Amazon Kinesis Data Firehose](https://aws.amazon.com/fr/kinesis/data-firehose/)** delivery stream.
3. Add the sentiment associated with the Tweet using **[Amazon Comprehend](https://aws.amazon.com/fr/comprehend/)**.
4. Send tweets to an **[Elasticsearch domain](https://aws.amazon.com/fr/elasticsearch-service/)**, accessible by **[Kibana](https://www.elastic.co/fr/kibana)** for visualization.
5. In case of an error, send the failed record in an **[Amazon S3](https://aws.amazon.com/fr/s3/)** bucket.

Here is the full process:

![Tweet Stream architecture](/articles/real-time-tweets-analysis-aws/2.png)


---

## Deploy AWS resources with Serverless

With the [Serverless framework](https://www.serverless.com/) you can deploy serverless applications to the cloud. We'll use it to deploy our custom Lambda and other AWS services.  

- Install Serverless with:

```bash
yarn global add serverless
```

- Create the Serverless config file `serverless.yml`, and copy the content from [this file (GitHub)](https://github.com/LucasLeRay/twitter-stream-aws/blob/master/serverless.yml).

```yaml
service: twitter-stream-aws # service name

frameworkVersion: '2' # Serverless version

custom: # custom Serverless variables
  ...

provider: # service configuration
  ...

functions:
  transformTweets: # lambda configuration
    handler: handler.transformTweets # function endpoint
    timeout: 60 # function timeout (in seconds)

resources: # AWS CloudFormation resources
  ...

plugins: # Serverless plugins
  ...
```

This file does 3 things:

- Configure Serverless framework
- Setup `transformTweets` lambda (which add sentiments to tweets)
- Define other AWS services (such as Kinesis Data Firehose or ElasticSearch)

If you want details about Serverless configuration, [this article](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/) is a wonderful source of informations.

---

## Develop a record transformation lambda

Now, let's code the `transformTweet` Lambda.  
We want this Lambda to:

- Get Tweets from the stream
- Get the associated sentiments
- Send the records back to the stream, with sentiments

Create a function `transformTweets` in `handler.py` with the following content:

```python
import base64
import json
import boto3

client = boto3.client('comprehend')

def transformTweets(event, context):
    output = []

    for record in event['records']:
        text = base64.b64decode(record['data']).decode('utf-8').strip()

        sentiment = client.detect_sentiment(Text=text, LanguageCode='en')

        data_record = {
            'text': text,
            'sentiment': sentiment
        }
        output_record = {
            'recordId': record['recordId'],
            'result': 'Ok',
            'data': base64.b64encode(json.dumps(data_record).encode('utf-8')).decode('utf-8')
        }
        output.append(output_record)

    return {'records': output}
```

As you can see, this function:
- Get records from `event['records']`
- Get the associated sentiments using Comprehend's `detect_sentiment` function
- Wrap the response in the correct format before returning it.

Think to install `boto3` and add it to a `requirements.txt` file so Serverless can use it in the cloud:

```bash
pip3 install boto3
pip3 freeze > requirements.txt
```

- Now, you can deploy with:

```bash
serverless deploy
```

⛔️ If the command fails, deploy a first time without lines 73-81 in `serverless.yml`:

```yaml
...
ElasticSearch:
  ...
	AccessPolicies: # REMOVE THIS POLICY FOR THE FIRST DEPLOYMENT
	  Version: "2012-10-17"
	  Statement:
	    - Effect: "Allow"
	      Principal:
	        AWS: "*"
	      Action: "es:*"
	      Resource:
	        - arn:aws:es:us-east-1:*:domain/${self:custom.es-config.domainName}/*
  ...
```

Indeed, AWS refuses to give public access to your Elasticsearch domain, which we do in this tutorial for simplicity. Keep in mind that in production, your domain should not be public.  

Anyway, deploy a first time without these lines and a second time with.

If everything worked, you should have this message in your console:

```bash
> serverless deploy

Serverless: Stack update finished...
Service Information
service: twitter-stream-aws
stage: dev
region: us-east-1
stack: twitter-stream-aws-dev
resources: 10
api keys:
  None
endpoints:
  None
functions:
  transformTweets: twitter-stream-aws-dev-transformTweets
layers:
  None
```
###### Everything worked ! 🎉

---

## Develop the Ingestion script

Everything is now deployed on AWS ! The stream, the processor lambda, the Elasticsearch domain...

But all this is useless until messages are sent to the stream !
To do this, we'll develop a script that:

- Get new tweets from Twitter Streaming API
- On new tweet, send its content to the stream

Here's a script that does that:

```python
import sys
import os
import json
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
from dotenv import load_dotenv, find_dotenv
import boto3

print(sys.argv[1:])
if len(sys.argv) < 2:
    raise Exception('No tweet filter provided')

load_dotenv(find_dotenv())
access_token = os.getenv('TWITTER_ACCESS_TOKEN')
access_token_secret = os.getenv('TWITTER_ACCESS_TOKEN_SECRET')
consumer_key = os.getenv('TWITTER_CONSUMER_KEY')
consumer_secret = os.getenv('TWITTER_CONSUMER_SECRET')

DeliveryStreamName = 'tweet-stream'

client = boto3.client('firehose', region_name='us-east-1')

class ListenerOut(StreamListener):
    def on_data(self, data):
        print(data)
        client.put_record(
            DeliveryStreamName=DeliveryStreamName,
            Record={'Data': json.loads(data)["text"]},
        )
        return True

    def on_error(self, status):
        print(status)

l = ListenerOut()
auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
stream = Stream(auth, l)
stream.filter(track=sys.argv[1:])
```

This script will listen for new tweets containing words specified in parameters. On new Tweets, it'll send them into our delivery stream.

Here is a few things to note about this piece of code:

- We get Twitter API keys from environments, so you need to add them in your `.env` file.
- To use `boto3` you need to have configured `AWS` in your machine or to add your API key directly in `boto3.client` ([check the boto3 documentation here](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)).
- To understand how `Tweepy` works, [check the documentation here](https://www.tweepy.org).

We can now launch the script like this:

```bash
> python3 stream.py "#USElection2020"
```

*The script will listen and send in the delivery stream the tweets about the US presidential election of 2020*

While this script is running, new tweets will:

- go to the delivery stream
- be transformed by `transformTweets` lambda
- go to the Elasticsearch domain (or the `BackupBucket` if it fails)

---

## Show Kibana statistics from Elasticsearch domain

Kibana is a data visualization dashboard for Elasticsearch. We'll use it to build a pie containing the different sentiments of the Tweets.

To visualize records (and check if everything works), go to your AWS Console, in your new Elasticsearch domain.

![AWS Elasticsearch domain](/articles/real-time-tweets-analysis-aws/3.png)

- The `Kibana` attribute specify the link to the `Kibana` plugin link. If the link doesn't work, make sure your Elasticsearch domain has public access.

By clicking this link, you should see this screen:

![Kibana Elasticsearch index](/articles/real-time-tweets-analysis-aws/4.png)

The **index pattern** `tweet*` allows Kibana to retrieve our tweets from Elasticsearch.

- Complete the index pattern creation and create a new pie in the Visualize part with the following configuration:

![Kibana pie chart](/articles/real-time-tweets-analysis-aws/5.png)

###### Tadaa ! You retrieve sentiments from tweets in real time ! 🎉

---

## Conclusion

In this tutorial, you learnt to:

- Create an AWS application using Serverless framework
- Deploy a Lambda to the cloud
- Use the Twitter Streaming API
- Send data to AWS Kinesis Data Firehose
- Get sentiments of text using AWS Comprehend
- Stream data to ElasticSearch
- Visualize real-time data using Kibana

If you want to learn more about **Serverless**, I recommend you to read the **[Serverless Handbook](https://serverlesshandbook.dev/)**.

If you liked this article, you can **[follow me on Twitter](http://twitter.com/intent/user?screen_name=Lucas_Le_Ray)** as I share a lot of things related to **Serverless** and **AWS**.
