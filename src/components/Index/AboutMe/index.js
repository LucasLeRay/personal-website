import React from "react";

import {
  Container,
  ContainerWrapper,
  ContentWrapper,
  ImageWrapper,
  Role,
  RoleList,
  Profile
} from "./AboutMe.module.css";

import pictureMe from "./img/me.png";
import awsmlLogo from "./img/aws-ml.png";
import berkeleyLogo from "./img/berkeley.png";
import nibbleLogo from "./img/nibble.png";

function AboutMe() {
  return (
    <section className={Container}>
      <div className={ContainerWrapper}>
        <div className={ContentWrapper}>
          <div className={Profile}>
            <div className={ImageWrapper}>
              <img alt="Lucas Le Ray" src={pictureMe} />
            </div>
          </div>
          <div className={RoleList}>
            <a
              className={Role}
              href="https://nibble.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <img alt="Nibble" src={nibbleLogo} />
              </div>
              <h3>ML Engineer @ Nibble</h3>
            </a>
            <a
              className={Role}
              href="https://www.credly.com/badges/c81369a5-3801-4691-b408-202d06fda56b/public_url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <img alt="AWS Machine Learning - Specialist" src={awsmlLogo} />
              </div>
              <h3>Certified Machine Learning Specialist @ AWS</h3>
            </a>
            <a
              className={Role}
              href="https://www.berkeley.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <img alt="UC Berkeley" src={berkeleyLogo} />
              </div>
              <h3>Alumni @ UC Berkeley & Epitech</h3>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
