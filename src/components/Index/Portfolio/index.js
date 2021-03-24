import React from "react"

import {
  Container,
  ContainerWrapper,
  ContentWrapper,
} from "./Portfolio.module.css"

import Project from "./Project"
import transpare from "./projects/transpare.png"
import crowdstar from "./projects/crowdstar.png"
import sheltin from "./projects/sheltin.jpg"
import blog from "./projects/blog.png"
import tweetStream from "./projects/tweet-stream.png"
import Blob1 from './blobs/blob1.svg'
import Blob2 from './blobs/blob2.svg'
import Blob3 from './blobs/blob3.svg'
import Blob4 from './blobs/blob4.svg'
import Blob5 from './blobs/blob5.svg'

function Portfolio() {
  return (
    <section id="portfolio" className={Container}>
      <div className={ContainerWrapper}>
        <div className={ContentWrapper}>
          <Project
            title="Real-time Tweet sentiment analysis"
            date="Mar. 2021"
            image={tweetStream}
            blob={<Blob5 />}
            links={[
              {
                name: "GitHub",
                url: "https://github.com/LucasLeRay/twitter-stream-aws",
              },
            ]}
          >
            <p>
              A serverless application that stream Tweets into Elasticsearch and Kibana through AWS Kinesis Data Firehose. A custom lambda transform data in the stream to add the sentiment associated with the Tweet.
            </p>
          </Project>
          <Project
            title="CrowdStar"
            date="Apr. 2020"
            image={crowdstar}
            blob={<Blob1 />}
            reverse
            links={[
              {
                name: "Application",
                url: "https://crowdstar.xyz",
              },
              {
                name: "Product Hunt",
                url: "https://www.producthunt.com/posts/crowdstar",
              },
              {
                name: "GitHub",
                url: "https://github.com/LucasLeRay/crowdstar-frontend",
              }
            ]}
          >
            <p>
              {"I built CrowdStar with "}
              <a
                href="https://www.linkedin.com/in/guillaume-monot/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Guillaume Monot
              </a>{". "}
              It's a Tweet wall service developed in React and using AWS (Amazon Web Services) services.
              It uses Socket.IO to retrieve Tweets from the Twitter API.
            </p>
          </Project>
          <Project
            title="Transpare Marketplace"
            date="Apr. 2019"
            image={transpare}
            blob={<Blob2 />}
            links={[
              {
                name: "Application",
                url: "https://transpare.eu",
              },
            ]}
          >
            <p>
              I'm building the Web Application of <a
                href="https://transpare.eu"
                target="_blank"
                rel="noopener noreferrer"
              >
                Transpare
              </a> as a Tech Lead of a team of 5 developers. We are developing the application with React and AWS (Amazon Web Services). The full tech stack is available on <a
              href="https://stackshare.io/transpare/marketplace"
              target="_blank"
              rel="noopener noreferrer"
              >StackShare</a>.
            </p>
          </Project>
          <Project
            title="My Website"
            date="Jan. 2019"
            image={blog}
            blob={<Blob3 />}
            reverse
            links={[
              {
                name: "Blog",
                url: "https://lucas-le-ray.com/blog",
              },
              {
                name: "GitHub",
                url: "https://github.com/LucasLeRay/personal-website",
              },
            ]}
          >
            <p>
              I design and develop the website you are currently on. I use React (with Gatsby) for the front-end and Netlify functions for the back-end, as it is hosted on Netlify.
            </p>
          </Project>
          <Project
            title="Shelt.In"
            date="Nov. 2018"
            image={sheltin}
            blob={<Blob4 />}
            links={[
              {
                name: "Landing page",
                url: "https://shelt.in",
              },
            ]}
          >
            <p>
              Shelt.In is a portable connected equipment (IOT) that retrieves information on the firefighter's state of health, geographical position and environment and communicates it to the intervention chief. The device works with Arduino and the dashboard is developed with Vue.JS and Strapi.
            </p>
          </Project>
        </div>
      </div>
    </section>
  )
}

export default Portfolio
