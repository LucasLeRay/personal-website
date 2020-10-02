---
path: "/blog/build-serverless-api-vercel-nodejs"
date: "2020-10-02"
title: "Build a Serverless API in seconds on Vercel with Node.Js"
time: 4
cover: "/articles/build-serverless-api-vercel-nodejs/1.jpg"
---

Having a personal server can have a lot of advantages, but also a lot of weakness:
- You are running a server **all the time**, even when no one is using your product.
- You have to pay, [sometimes a lot](https://www.webhostingsecretrevealed.net/website-hosting-cost/#5).
- You have to configure everything yourself and do some _sysadmin_ work.
- Resources allocated to your server are limited, and if you have a spike in usage, it may crash.

For these reasons, building a WEB API can be unnecessarily long and expensive.  

The truth is that you may not need any server at all.  
What if I told you that it’s possible to code and deploy a performant WEB API  in seconds, without any cost?

https://media.giphy.com/media/3o84U6421OOWegpQhq/giphy.gif

To show you how, we are going to build a Serverless API and deploy it on Vercel.

**But what’s Serverless?**  
[Serverless Stack](https://serverless-stack.com) describes Serverless as “_an execution model where the cloud provider is responsible for executing a piece of code by dynamically allocating the resources_”. In other words, the _Cloud Provider_ ([Vercel](https://vercel.com) in our case), takes care about everything, from resource management to deployment.

In this article, you’ll learn how to build a simple WEB API which send random lyrics from _Pop Smoke_ (R.I.P 🕊).
We’ll code it in [Node.Js](https://nodejs.org/) and use the [genius-lyrics API](https://genius-lyrics.zyrouge.gq).
Again, all of it in seconds, without paying anything.

---

## Building the API 🛠

Enter this command to setup the project:
```
yarn init
```

Then install  `genius-lyrics` :
```
yarn add genius-lyrics
```

Now, write this code in `api/index.js`:

`gist:LucasLeRay/e6d13dfb149c5a0598cd575c971361b1`

As you can see, no need to add an API KEY to make [genius-lyrics](https://genius-lyrics.zyrouge.gq) work, but adding a Genius API Key will unlock some cool features, you can see a more complete code [here](link github).

---

## Deployment 🍾
The most interesting part, and yet the easiest one.  

To deploy an API to Vercel, just install it with:
```
yarn global vercel
```

Then, just launch the following command in the root of your project.
```
vercel --prod
```

If it’s the first time you use the CLI, you’ll need to login to Vercel.  
You’ll be then prompted to add some infos to your project (default options are fine).

Here's the response you should have:
```
Vercel CLI 20.1.1
🔍  Inspect: DETAILS-URL [3s]
✅  Production: YOUR-PRODUCTION-URL [copied to clipboard] [14s]
```

And voilà !  
Just go to `https://YOUR-PRODUCTION-URL/api` to see it live!  
You can take a look at my live version [here](https://serverless-vercel-mu.vercel.app/api).

```
{
  "status": 200,
  "lyrics": "Oh, oh, oh, oh"
}
```
###### So deep lyrics 👀

Here are some advantages of our fresh new API:
- It only runs when called.
* It’s free, forever. [Vercel’s paid plans](https://vercel.com/pricing) are for team projects.
* Vercel automatically scales the allocated resources, so no need to worry if your API will resist x100 usage.
* Vercel offers a lot of configuration. For example, you can automatically deploy your API from a GitHub repository. Take a look at your new dashboard on [Vercel](https://vercel.com/dashboard).

---

## Serverless Drawbacks 🤔
As we just saw, Serverless is awesome, but it’s not perfect, though. Here’s some common critics about it:
- **[Cold Start](https://dashbird.io/blog/can-we-solve-serverless-cold-starts/)**: Your API may be a bit slower than a regular server. It's because your Serverless function needs to warm up when it’s called, whereas your server is always up.
- **[Loss of Control](https://www.oreilly.com/library/view/what-is-serverless/9781491984178/ch04.html#idm140542862552224)**: Your API is operated by a third party, the Cloud Provider, and not by yourself. Therefore, you depend on them for the reliability of your API.
- **[Difficult Monitoring](https://www.serverless.com/blog/serverless-monitoring-the-good-the-bad-and-the-ugly)**: In general, Serverless apps are harder to test and monitor and It can be a problem when you need to have critical insight into your functions.

The great thing is that Serverless community is working to make it even better, correcting or reducing its defects.

---

## Conclusion 🎉

For most of your backend needs, Serverless may be a great opportunity. Coupled with a [SSG (Static Site Generator)](https://www.staticgen.com) such as [Next.Js](https://nextjs.org) you can build complete applications without any server needs nor financial costs.

The sky is the limit, and we only saw a very minimal use of what is possible to do with Serverless or Vercel.

Did you use Serverless In your projects? [Tell me on Twitter](http://twitter.com/intent/tweet?text=Hey%20@Lucas_Le_Ray%20,%20) and show me the results!
