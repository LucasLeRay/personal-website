import React from "react"
import MovingWave from "@bit/lucasleray.landing-stuff.moving-wave"

import Header from "../../Header"
import { Container, WaveWrapper, Intro } from "./Hero.module.css"
import emojiWaving from "./img/waving.png"

function Hero() {
  return (
    <section className={Container}>
      <Header />
      <div className={Intro}>
        <h1>
          Welcome to my Blog! <img src={emojiWaving} alt="hello" />
        </h1>
        <h2>
          I mainly share my experience in making bootstrapped projects and
          programming web stuff.
        </h2>
      </div>
      <MovingWave className={WaveWrapper} />
    </section>
  )
}

export default Hero
