import React from "react";
import aws from "./img/aws.png";
import spark from "./img/spark.png";
import tensorflow from "./img/tensorflow.png";
import keras from "./img/keras.png";
import docker from "./img/docker.png";
import git from "./img/git.png";
import python from "./img/python.png";

import { Container, ContainerWrapper, ImageList } from "./Skills.module.css";

function Skills() {
  return (
    <section id="skills" className={Container}>
      <div className={ContainerWrapper}>
        <div className={ImageList}>
          <img src={aws} alt="aws" />
          <img src={tensorflow} alt="tensorflow" />
          <img src={keras} alt="keras" />
          <img src={python} alt="python" />
        </div>
        <div className={ImageList}>
          <img src={spark} alt="apache spark" />
          <img src={docker} alt="docker" />
          <img src={git} alt="git" />
        </div>
      </div>
    </section>
  );
}

export default Skills;
