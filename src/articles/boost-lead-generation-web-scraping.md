---
path: "/blog/boost-lead-generation-web-scraping"
date: "2020-11-01"
title: "Boost your Lead Generation with Web Scraping"
time: 3
cover: "/articles/boost-lead-generation-web-scraping/1.png"
---

Does it ever happened to you, to build an awesome product, but having no users ?
You know your product is great, but you just don’t know where to find clients.  
You could search on internet, but that’s too long to find and send emails to each potential user!  

Fortunately, **Web Scraping** could be a solution for you.

Today we’re going to see:
- What’s web scraping
- If it's legal
- What data you can extract with it
- Which tools you can use
- How to Generate Leads

---

## What’s Web Scraping ? 🤔
**A Web Scraper is a tool used to extract data from websites.**  

It can have a lot of form:
- An extension driving your navigator, like [Web Scraper](https://webscraper.io).
- A whole program running a “false” navigator, using tools like [Puppeteer](https://pptr.dev).
- A simple request to a website with response content processed with tools like [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/).

Let’s say you want to contact every companies in the top 100 from Y Combinator, you can get this data manually here:
[Startup Directory](https://www.ycombinator.com/companies/?top100=true)
![YCombinator top 100 Companies](/articles/boost-lead-generation-web-scraping/2.png)
But there’s a few problems:
- **It’s long**: You have to click on each site to get your data.
- **It’s incomplete**: You don’t even have emails ! You have to get them yourself, which can make the process even longer.
- **It’s not automated**: If new companies come in the top 100, your data will be outdated.  

And obviously, this process is not scalable: the more data you need, the more time you spend searching on the web.

By using a **Web Scraper**, you can get this data fast and automatically !  
A simple Scraper will do the following steps:
1. Going on the page
2. Getting data (Company name, address, description, logo, ...)
3. Using APIs such as [hunter.io](https://hunter.io/) to get emails related to the company  

**All in seconds.**

---

## Is Web Scraping legal ? 👩‍⚖️
Yes, **Web Scraping is legal**, technically.  

During the [trial of Linkedin against hiQ labs](https://parsers.me/us-court-fully-legalized-website-scraping-and-technically-prohibited-it/), the US court of appeal decided that since Linkedin data was **public** and **not copyrighted** , there was nothing illegal by scraping it.  

You just have to make sure that this data is **public** and that you **don’t use it illegally**, of course.  

Here a few links on this subject:  
- [Is Web Scraping Illegal? | Imperva](https://www.imperva.com/blog/is-web-scraping-illegal/)  
- [Web scraping is now legal. | Tom Waterman](https://medium.com/@tjwaterman99/web-scraping-is-now-legal-6bf0e5730a78)

---

## What data can I extract with Web Scraping ? 🎣
Virtually any piece of public data on the web (and even less public ones.. 👀).  

Your desired data is just one Google Search away, whether you’re looking for [Financial Assets](https://finance.yahoo.com), [Demographic ones](https://directoryw.com/country.php?id=279), [Songs Lyrics](https://genius.com/Big-shaq-mans-not-hot-lyrics) or even [Movie Scripts](https://www.imsdb.com), chances are your beloved data is already publicly available online. Same goes for company data, as we’re going to see later.

---

## Which tool to use for web scraping ? 🛠
There are plenty of tools for every type of use and skill level:
- **Web Extensions** like [Web Scraper](https://webscraper.io) is a good start and will be able to retrieve most simply structured data.
- If you have basic programming skills, **libraries** such as [Puppeteer](https://pptr.dev)(Node.JS) or [Selenium](https://selenium-python.readthedocs.io) (Python) offer more possibilities and can easily be automated.

---

## Generate Leads with Web Scraping 📈
Let’s say my prospects are **French E-Commerce Startup**.  
I found this website, which is a directory of French Startup, with an **e-commerce** category:
![Scraping Usine Digitale](/articles/boost-lead-generation-web-scraping/3.png)
❗️ Sensible data has been obfuscated, text has been translated, and the page structure slightly modified for the better understanding of this article.

We can get the following infos for each startup of this category (more than 650):
- Name
- Founder's name
- Market
- Creation date
- Phone number
- **And even more**

It’s easy these days to program a simple bot which go on each startup of the directory, get those infos and use APIs such as [Twilio](https://www.twilio.com) to send SMS like this:

![Automated cold sms](/articles/boost-lead-generation-web-scraping/4.png)
Such a program can be a powerful lead generation tool for your business.  
[Let me know](http://twitter.com/intent/tweet?text=Hey%20@Lucas_Le_Ray%20,%20) if you’re interested on a detailed tutorial on how to make a bot like this.

---

## Conclusion 
Web Scraping is a **powerful** and **cheap** way to get a massive amount of data, **legally**.  
You don’t even need to have IT skills to use one and many tools allow you to use extracted data automatically.
Sometimes, there are even [simpler alternatives to Web Scraping](https://towardsdatascience.com/the-alternative-to-web-scraping-8d530ae705ca) without any need of building something.

Please [let me know if you found this article useful](http://twitter.com/intent/tweet?text=Hey%20@Lucas_Le_Ray%20,%20) and don’t hesitate to [tell me what you used Web Scraping for](http://twitter.com/intent/tweet?text=Hey%20@Lucas_Le_Ray%20,%20) !
