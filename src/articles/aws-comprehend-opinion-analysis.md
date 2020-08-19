---
path: "/blog/aws-comprehend-opinion-analysis"
date: "2020-05-11"
title: "Use NLP with AWS Comprehend to know the most famous U.S candidate"
time: 3
cover: "/articles/aws-comprehend-opinion-analysis/1.jpg"
---

500 million.

It's the number of tweets posted per day, 50,000 new since you read this article. I tweet a lot myself:

https://twitter.com/Lucas_Le_Ray/status/1246338630672474112

It's a colossal amount of data, containing the opinions and thoughts of [nearly 50 millions US citizens](https://www.omnicoreagency.com/twitter-statistics/).

With the growth of **NLP** (Natural Language Processing) tools such as **AWS Comprehend**, **Google Cloud NLP** or **IBM Watson**, we can analyze people's messages and know their thoughts.

With such tools, is it possible to know the popularity of _Joe Biden_ and _Donald Trump_, the two candidates for president of the United States?

We will proceed in several stages:

1. Find out how to retrieve tweets about both candidates
2. Find out how to use AWS Comprehend to analyze them
3. Develop a program with **Node.js** that performs all these actions and stores the results in a database
4. Analyze results
5. Identify procedural flaws

---

## Retrieve Tweets 🐦

To get tweets to analyze, we are going to use the **Twitter API**.  
To use Twitter API, we will need to sign up and register an app to get API keys: [Twitter developers console](https://developer.twitter.com). Now we can use the **Twit** library to retrieve Tweets:

`gist:LucasLeRay/dd210f93f282b1711ec07f9d2dbedf15`

`statuses` now contains the last 100 tweets containing "_Donald Trump_" with a lot of information, including the tweets contents in the `text` attribute:

---

## Analyze Sentiments of Tweets 🧠

Now that we have data to analyse, let's use **AWS Comprehend** to get the sentiment of a text author.  
To use Comprehend, we will need to sign up and setup **AWS CLI** to use this library: [AWS console](https://aws.amazon.com).  
Now we can use Comprehend from the **AWS SDK**:

`gist:LucasLeRay/db20c56e2fd9d0d8c59c0fb0524bf03a`

In `data` we now have the following object:

```
{
  "Sentiment": "POSITIVE",  // The most present emotion
  "SentimentScore": {  // The score in each of the emotions
    "Positive": 0.9970256686210632,
    "Negative": 0.00012458743003662676,
    "Neutral": 0.0028411296661943197,
    "Mixed": 0.000008623201210866682
  }
}
```

In this case, the text "_I love apples_" is detected as a `POSITIVE` text with an accuracy of 0.997.

---

## The complete code 🚀

You can get the complete code at this address: [opinion-analyzer](https://github.com/LucasLeRay/opinion-analyzer). It does the following things:

- Let the user enter the subject and the number of tweets to retrieve:

```
node index.js --subject "Donald Trump" --tweets 100
```

- Retrieve these tweets
- Get the sentiment of each tweets
- If the sentiment of a tweet is Positive or Negative, stock it into a light JSON database using **low-db**. If the sentiment is Neutral or Mixed ignore it.

With a crontab, I'm launching this script every 6 hours to retrieve 25 tweets about _Donald Trump_ and 25 others about _Joe Biden_, the database has the following format:

```
{
  "Donald Trump": {  // The subject
    "sinceId": 1257563324088123400  // The last tweet retrieved
    "5-5-2020": {  // The date of the extract
      "positive": 0.08,  // the rate of positive tweets
      "negative": 0.32,  // the rate of negative tweets
      "count": 50  // the count of every tweets
    },
  },
  "Joe Biden": {
    "sinceId": 1257563449518768000
    "5-5-2020": {
      "positive": 0.1,
      "negative": 0.24,
      "count": 50
    },
  }
}
```

---

## The Results 📊

After running for a week, here are the results of **Donald Trump**:

![Donald Trump Popularity](/articles/aws-comprehend-opinion-analysis/2.png)

And here's **Joe Biden**'s:

![Joe Biden Popularity](/articles/aws-comprehend-opinion-analysis/3.png)

As we can see, _Joe Biden_ has significantly more positive tweets (about **362%** more) and less negative ones than _Donald Trump_ (about **38%** less).

One surprising thing is that both _Donald Trump_ and _Joe Biden_ have much more negative tweets than positive ones (**1672%** more for _Donald Trump_ and **287%** more for _Joe Biden_).

---

## The Flaws 😬

Ok, so Joe Biden is more popular than Donald Trump?  
Hum, not so sure.

There are a lot of factors that invalidate the previous results:

- **Not everyone is on Twitter**, "only" [22% of US adults](https://www.omnicoreagency.com/twitter-statistics/)
- **Only active tweeters are taken into account**, not tweeters who don't post.
- **People have more reaction when they're feeling negative emotions**, that explains why there are so many more negative tweets than positive ones.
- **The program only runs 4 times a day**, to be really accurate, the program should take into account all new tweets regardless of the hour.
- **Not enough data**, I would need thousands or even millions of tweets to get convincing results, but I don't really want to spend my scholarship on my [Amazon bill](https://aws.amazon.com/fr/comprehend/pricing/), so we'll stay at 100 per day

Finally, Comprehend doesn't get sarcasm effectively, for example a tweet containing : "_Of course I love Donald Trump! who doesn't love racism?_ " got a score of **89.2%** as a positive feeling.

https://media.giphy.com/media/3o6ZtaWzv2oQNaIbjq/giphy.gif

---

## Conclusion 

There are many reasons not to think that these results correspond to reality, which can be verified very easily thanks to [FiveThirtyHeight](https://projects.fivethirtyeight.com/trump-approval-ratings/).

But as we have seen, most flaws are not related to Comprehend, but are mainly due to the fact that the analysis of Tweets does not allow us to know the popularity of someone, but rather the rate of negativity or positivity it generates, which is very different.

NLP is a very promising domain. [Numerous studies already exist on its use in the field of politics](https://www.ihu.edu.gr/tjortjis/A%20Method%20for%20Predicting%20the%20Winner%20of%20the%20USA%20Presidential%20Elections%20using%20Data%20Extracted%20from%20Twitter%20(3).pdf), but it also finds its use in many other fields. For example, services like [Deepl](https://www.deepl.com) use Deep Learning to translate text efficiently.

With this program we have only seen a glimpse of what can be achieved with NLP, this area is very exciting and there is a lot to do with it!

If you have any questions or remarks do not hesitate to [tweet me](http://twitter.com/intent/tweet?text=Hey%20@Lucas_Le_Ray%20What's%20up?)!
