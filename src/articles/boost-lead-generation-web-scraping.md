---
path: "/blog/boost-lead-generation-web-scraping"
date: "2020-11-01"
title: "Boost your Lead Generation with Web Scraping"
time: 4
cover: "/articles/boost-lead-generation-web-scraping/1.jpg"
---

Has it ever happened to you, to build a great product, but have no users?  
You know your product is great, but you don't know where to find clients.  
You could search on internet, but it'd be too long to find and send emails to every potential user!  

**Web Scraping** could be a solution for you.

Today we’re going to see:
- What’s web scraping
- If it's legal
- What data you can extract with it
- Which tools you can use
- How to **Generate Leads**

---

## What’s Web Scraping ? 🤔
**A Web Scraper is a tool used to extract data from websites.**  

It can have many forms:
- An extension driving your navigator, like [Web Scraper](https://webscraper.io).
- A whole program running a “fake” navigator, using tools like [Puppeteer](https://pptr.dev).
- A simple script analyzing the response content of a site with tools like [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/).

Let’s say you want data from Y Combinator's top 100 companies, you can get it by hand in the [Startup Directory](https://www.ycombinator.com/companies/?top100=true):
![YCombinator top 100 Companies](/articles/boost-lead-generation-web-scraping/2.png)
But there’s a few problems:
- **It’s long**: You have to click on each site to get your data.
- **It’s incomplete**: You don’t even have emails ! You have to get them yourself, which can make the process even longer.
- **It’s not automated**: If new companies come in the top 100, your data becomes obsolete.  
- **It's not scalable**: the more data you need, the more time you spend.

By using a **Web Scraper**, you can get this data fast and automatically !  
A simple Scraper will do the following steps:
1. Going on the page.
2. Getting data (Company name, address, description, logo, ...).
3. Using APIs such as [hunter.io](https://hunter.io/) to get emails related to the company.  

**All in seconds.**

---

## Is Web Scraping legal ? 👩‍⚖️
Yes, **Web Scraping is legal**, technically.  

During the [Linkedin vs. hiQ labs trial](https://parsers.me/us-court-fully-legalized-website-scraping-and-technically-prohibited-it/), the US court of appeal ruled that since Linkedin data was public and not copyrighted, there was nothing illegal about scraping it.

Just make sure that your targeted data is **public** and that you **don’t use it illegally**, of course.  

Here a few links on this subject:  
- [Is Web Scraping Illegal? | Imperva](https://www.imperva.com/blog/is-web-scraping-illegal/)  
- [Web scraping is now legal. | Tom Waterman](https://medium.com/@tjwaterman99/web-scraping-is-now-legal-6bf0e5730a78)

---

## What data can I extract with Web Scraping ? 🎣
Virtually any piece of public data on the web (and even less public ones.. 👀).  

The data you want is just a Google Search away, whether you’re looking for [Financial Assets](https://finance.yahoo.com), [Demographic data](https://directoryw.com/country.php?id=279), [Song Lyrics](https://genius.com/Big-shaq-mans-not-hot-lyrics) or even [Movie Scripts](https://www.imsdb.com), chances are your beloved data is already available online. Same goes for company data, as we’re going to see later.

---

## Which tools to use for Web Scraping ? 🛠
There are plenty of tools for every type of use and skill level.  
**Web Extensions** like [Web Scraper](https://webscraper.io) are a good start:
- They are easy to use.
- They can retrieve data from pages with a simple structure.

**No Code tools** like [Phantom Buster](https://phantombuster.com/) offer great possibilities:
- They automate data extractions.
- They have many integrations (with tools like [Zapier](https://zapier.com/) or [Integromat](https://www.integromat.com/en/)).
- They are highly customizable.
- They are cheap for basic usage.

If you have basic programming skills, you may want to build a Web Scraper yourself, with **libraries** such as [Puppeteer](https://pptr.dev) (Node.JS) or [Selenium](https://selenium-python.readthedocs.io) (Python):
- The workflow is highly customizable (because you code it yourself).
- You can browse through the most complex websites.
- It's free.

---

## Generate Leads with Web Scraping 📈
Let’s say my prospects are **French E-Commerce Startup**.  
I found this website, which is a directory of French Startup, with an **e-commerce** category:
![Scraping Usine Digitale](/articles/boost-lead-generation-web-scraping/3.png)

I've hidden sensitive data, translated the text and modified the page structure for a better understanding of this article.

We can get the following data for each startup of this category (more than 650):
- Name
- Founder's name
- Market
- Creation date
- Phone number
- **And even more**

Now we can program a simple bot that retrieves information from each startup and use APIs such as [Twilio](https://www.twilio.com) to send SMS like this:

![Automated cold sms](/articles/boost-lead-generation-web-scraping/4.png)
Such a program can be a powerful **Lead Generation** tool for your business.  
[Let me know](http://twitter.com/intent/tweet?text=Hey%20@Lucas_Le_Ray%20,%20) if you’re interested on a detailed tutorial on how to make a bot like this.

---

## Conclusion 
Web Scraping is a **powerful** and **cheap** way to get a massive amount of data, **legally**.  

You don’t even need to have IT skills to use one, and many tools allow you to use extracted data automatically.  

Sometimes, there are even [simpler alternatives to Web Scraping](https://towardsdatascience.com/the-alternative-to-web-scraping-8d530ae705ca) without any need of building something.

Please [let me know if you found this article useful](http://twitter.com/intent/tweet?text=Hey%20@Lucas_Le_Ray%20,%20) and [tell me what you used Web Scraping for](http://twitter.com/intent/tweet?text=Hey%20@Lucas_Le_Ray%20,%20) !
