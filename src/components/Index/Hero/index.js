import React from "react"
import MovingWave from "@bit/lucasleray.landing-stuff.moving-wave"

import Header from "../../Header"
import { Container, WaveWrapper, Intro } from "./Hero.module.css"
import emojiDown from "./img/down.png"
import emojiVictory from "./img/victory.png"

function Hero() {
  return (
    <section className={Container}>
      <Header />
      <div className={Intro}>
        <h1>
          Hi, I'm Lucas ! <img src={emojiVictory} alt="hello" />
        </h1>
        <h2>
          I'm a Machine Learning Engineer and a Délice.
          <br />
          You can see my resume by{" "}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            clicking here
          </a>
          .
          <br />
          Take a look at my projects right down{" "}
          <img src={emojiDown} alt="down" />
        </h2>
      </div>
      <MovingWave className={WaveWrapper} />
    </section>
  )
}

export default Hero
