import React from "react";

import {
  Container,
  ContainerWrapper,
  ContentWrapper,
} from "./Portfolio.module.css";

import Project from "./Project";
import smartMirror from "./img/smart-mirror.png";
import meilleurscoupons from "./img/meilleurscoupons.png";
import raytracer from "./img/raytracer.png";
import corewar from "./img/corewar.png";
import transpare from "./img/transpare.png";
import crowdstar from "./img/crowdstar.png";

function Portfolio() {
  return (
    <section id="portfolio" className={Container}>
      <div className={ContainerWrapper}>
        <div className={ContentWrapper}>
          <Project
            title="CrowdStar"
            date="Apr. 2020"
            image={crowdstar}
            links={[
              {
                name: "Application",
                url: "https://crowdstar.xyz",
              },
              {
                name: "Product Hunt",
                url: "https://www.producthunt.com/posts/crowdstar",
              },
            ]}
            reverse
          >
            <p>
              {"I built CrowdStar with "}
              <a
                href="https://www.linkedin.com/in/guillaume-monot/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Guillaume Monot
              </a>{" "}
            </p>
            <p>
              CrowdStar is the easiest and most effective way to gain popularity
              for your event through Social Media. With CrowdStar, setup a Tweet
              wall for your awesome events in seconds!
            </p>
            <p>
              The application is developed with React.JS and Node.Js. It uses
              services of AWS (Amazon Web Service).
            </p>
          </Project>
          <Project
            title="Transpare Web App"
            date="Apr. 2019"
            image={transpare}
            links={[
              {
                name: "Application",
                url: "https://transpare.eu",
              },
            ]}
          >
            <p>
              I build the Web Application of{" "}
              <a
                href="https://transpare.eu"
                target="_blank"
                rel="noopener noreferrer"
              >
                Transpare
              </a>{" "}
              from the very beginning, first as a fullstack developer in a team
              of 3 developers, then as a lead developer of a team of 5.
            </p>
            <p>
              The application is developed with React.JS and use many services
              of AWS (Amazon Web Service).
            </p>
          </Project>
          <Project
            title="Smart Connected Mirror"
            date="Feb. 2019"
            image={smartMirror}
            links={[
              {
                name: "Github",
                url: "https://github.com/Nicolrnt/Smart-Connected-Mirror",
              },
            ]}
            reverse
          >
            <p>
              I built, with the help of{" "}
              <a
                href="https://github.com/Nicolrnt"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nicolas LAURENT
              </a>
              , a smart connected mirror displaying some informations like
              meteo, time, news or inspiring quotes.
            </p>
            <p>
              This mirror is connected to a Raspberry PI which runs our Web app
              developed with the Vue.JS framework. A Node.JS server is also
              running and get the data displayed by the mirror.
            </p>
          </Project>
          <Project
            title="Meilleurs Coupons"
            date="Oct. 2017"
            image={meilleurscoupons}
          >
            <p>
              I developed with Node.Js and Phantom.Js a Web Scraper which gets
              every week 10.000 promotional codes for almost 1.500 e-shops. The
              collected data being stored in a MongoDB database.
            </p>
            <p>
              Then, I developed a Website and a Mobile App allowing the visitor
              to have access to these promotional codes in exchange for his
              email address. This website now have restricted access, for legal
              reasons.
            </p>
          </Project>
          <Project
            title="Raytracer"
            date="May 2017"
            image={raytracer}
            links={[
              {
                name: "Github",
                url: "https://github.com/LucasLeRay/Raytracer2",
              },
              {
                name: "Youtube",
                url: "https://www.youtube.com/watch?v=ioyE9032myY",
              },
            ]}
            reverse
          >
            <p>
              This project is a 3D graphic engine using the raytracing
              calculation method entirely developed in C language.
            </p>
            <p>
              It allows the user to create scenes, use many visual effects,
              pre-render a video and even play chess!
            </p>
          </Project>
          <Project
            title="Corewar"
            date="Apr. 2017"
            image={corewar}
            links={[
              {
                name: "Youtube",
                url: "https://www.youtube.com/watch?v=H92gh-jhHAA",
              },
            ]}
          >
            <p>
              The Corewar is a famous programming game in which many programs
              compete for control of a virtual computer.
            </p>
            <p>
              I developed this game in C language, allowing the user to create
              his own "warriors" and see the game with a graphic rendering of
              the fights.
            </p>
          </Project>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
