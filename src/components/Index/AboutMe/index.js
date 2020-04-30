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
import sheltinLogo from "./img/sheltin.png";
import epitechLogo from "./img/epitech.png";
import transpareLogo from "./img/transpare.png";

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
              href="https://transpare.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <img alt="Transpare" src={transpareLogo} />
              </div>
              <h3>Lead Developer @ Transpare</h3>
            </a>
            <a
              className={Role}
              href="https://shelt.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <img alt="Shelt.In" src={sheltinLogo} />
              </div>
              <h3>CEO @ Shelt.In</h3>
            </a>
            <a
              className={Role}
              href="https://epitech.eu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <img alt="Epitech" src={epitechLogo} />
              </div>
              <h3>Student @ Epitech</h3>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
