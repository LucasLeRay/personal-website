---
path: "/blog/build-slackbot-nodejs-2020"
date: "2020-10-17"
title: "How to build a Slack bot with Node.Js in 2020"
time: 3
cover: "/articles/build-slackbot-nodejs-2020/1.jpg"
---

Everyday I spend 30m checking stats from this blog, that’s **180 hours** a year !

These stats are useful to know if my articles are relevant (if you quit now I’ll know it and be very sad… 👉👈).  
But getting these stats is too long, I have to use Google Analytics, Stripe, my database, etc...  
The good news is that I know how to get this data automatically, and I’ll teach you how, with a **Slack Bot** 🤖.

More precisely, we’re going to build a bot that tells me the money on my Stripe account. This money comes from the donations you make to me through [Buy Me A Coffee](https://www.buymeacoffee.com/) at the bottom right of the page. We will use Node.JS, Slack API and Stripe API !

You can get the final code [on GitHub](https://github.com/LucasLeRay/stripe_balance_slackbot) or you can copy my [Glitch project](https://glitch.com/edit/#!/join/4d7ef406-2714-41de-bd2f-216561bd452b).

Here are the steps:
- Creating a Slack Application
- Coding a Slack Bot using Bolt.Js
- Registering to Slack Events
- Admiring the result !  

---

## Creating a Slack Application
To build a Slack Bot, we’ll need to [create a Slack App](https://api.slack.com/apps?new_app=1).
We have to choose a name and the workspace to install it:
![Create a Slack App](/articles/build-slackbot-nodejs-2020/2.png)
then we add permissions so that Slack knows what it has to allows us to do
- **app_mentions:read**: allow to read messages that mention the app.
- **chat**:write: allow to write messages.
- **im:history**: allow to read direct messages to the app.  

The full list of permissions is available [in the scope section](https://api.slack.com/scopes).
![Slack App permissions](/articles/build-slackbot-nodejs-2020/3.png)
Now we can install the app to our Slack Workspace !
![Install a Slack App to a Workspace](/articles/build-slackbot-nodejs-2020/4.png)
As a bonus, we can customize the app's name, description, color and icon:
![Customize a Slack App](/articles/build-slackbot-nodejs-2020/5.png)

---

## Coding a Slack Bot using Bolt.Js
Now that we've created our bot, we can code its behaviors. We’re going to use Bolt.JS (the official framework to build Slack Apps) and Node.Js.
To begin with, [clone my project from Glitch](https://glitch.com/edit/#!/join/4d7ef406-2714-41de-bd2f-216561bd452b).
![Code a Slack Bot with Bolt.Js](/articles/build-slackbot-nodejs-2020/6.png)
Glitch allows us to code our bot and make its code live. That’ll be useful to test the bot without deploying it on a server (you can also use [Ngrok](https://ngrok.com/)).
To make this code work, we need our Slack API keys.

We have `SLACK_SIGNING_SECRET` in the **Basic Information** section:
![Slack signing secret](/articles/build-slackbot-nodejs-2020/7.png)
And `SLACK_BOT_TOKEN` in **Install App**:
![Slack bot token](/articles/build-slackbot-nodejs-2020/8.png)
We also need the **Stripe Secret API key**, which you can find in your [Stripe Dashboard](https://dashboard.stripe.com/dashboard):
![Stripe secret API key](/articles/build-slackbot-nodejs-2020/9.png)
We can now enter your API Keys in the `.env` file:
![Glitch env file](/articles/build-slackbot-nodejs-2020/10.png)

---

## Registering to Slack Events 

The code in `index.js` has two parts:
- Configure and launch the bot
- Listen and respond to events

Bot configuration is done with the following:  

```javascript
const { App } = require("@slack/bolt");
require("dotenv").config(); // Get the API keys from .env file

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
}); // Configure the Slack App from our API keys

(async () => {
  await app.start(process.env.PORT || 3000); // Launch the bot
  console.log("⚡️ Bolt app is running!");
})();
```

The following code will listen to **messages** containing ”*Am I rich yet?*” and respond in the same channel with the total amount of dollars in the Stripe Balance:  

```javascript
const stripe = require("stripe")(process.env.STRIPE_SECRET);

app.message("Am I rich yet?", async ({ message, say }) => {
  const { available } = await stripe.balance.retrieve();
  say(`Here's your 💸\n${available[0].amount.toFixed(2)}`);
});
```

If we try our bot now it’ll not work: We didn’t say to Slack which events we want to listen !
We can do it in the **Event Subscriptions** section:
![Add request URL to Slack app](/articles/build-slackbot-nodejs-2020/11.png)
We need to specify in the **Request URL** the HTTP address of our bot, which is `GLITCH_URL/slack/events`.  
In my case: https://foul-cotton-medicine.glitch.me/slack/events.

Now, we can subscribe to 2 events:
- **message.im**: We listen to messages posted to direct message channels
- **app_mention**: We ONLY listen to messages that mention our bot.  

Our bot is basically saying to Slack: “_tell me when someone is sending me a direct message, but no other message_”.

![Subscribe to Slack events](/articles/build-slackbot-nodejs-2020/12.png)
Now, let’s go to our workspace:
![Slack bot responding to my message](/articles/build-slackbot-nodejs-2020/13.png)
###### woohoo! I’m poor!

---

## Conclusion

Today, you built a Slack Bot that saved you minutes everyday ! Congrats ! 🎉

But it’s just the beginning. We only saw a bit of what you can do with a Slack Bot. Feel free to [check the Bolt.Js documentation](https://slack.dev/bolt-js/concepts#basic) to see the possibilities !

You’d find it useful to [deploy your bot on Heroku](https://slack.dev/bolt-js/deployments/heroku). Thankfully it’s as easy as it sounds, just don’t forget to update the **Request URL** of your event subscriptions.

Please [let me know if you found this article useful](http://twitter.com/intent/tweet?text=Hey%20@Lucas_Le_Ray%20,%20) and [show me what you built on Twitter](http://twitter.com/intent/tweet?text=Hey%20@Lucas_Le_Ray%20,%20) !
