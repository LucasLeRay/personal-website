import React from "react";
import aws from "./img/aws.png";
import cLanguage from "./img/cLanguage.png";
import cppLanguage from "./img/cppLanguage.png";
import docker from "./img/docker.png";
import git from "./img/git.png";
import graphql from "./img/graphql.png";
import heroku from "./img/heroku.png";
import nodejs from "./img/nodejs.png";
import python from "./img/python.png";
import react from "./img/react.png";

import { Container, ContainerWrapper, ImageList } from "./Skills.module.css";

function Skills() {
  return (
    <section id="skills" className={Container}>
      <div className={ContainerWrapper}>
        <div className={ImageList}>
          <img src={aws} alt="aws" />
          <img src={react} alt="react" />
          <img src={nodejs} alt="nodejs" />
          <img src={docker} alt="docker" />
          <img src={git} alt="git" />
        </div>
        <div className={ImageList}>
          <img src={cLanguage} alt="c language" />
          <img src={cppLanguage} alt="c++ language" />
          <img src={graphql} alt="graphql" />
          <img src={heroku} alt="heroku" />
          <img src={python} alt="python" />
        </div>
      </div>
    </section>
  );
}

export default Skills;
