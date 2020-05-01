import React from "react"
import MovingWave from "@bit/lucasleray.landing-stuff.moving-wave"
import { string } from "prop-types"

import Header from "../../Header"
import { Container, WaveWrapper } from "./Hero.module.css"

function Hero({ cover }) {
  return (
    <section
      className={Container}
      style={{
        backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.45), 
      rgba(0, 0, 0, 0.45)
    ), url(${cover})`,
      }}
    >
      <Header />
      <MovingWave className={WaveWrapper} />
    </section>
  )
}

Hero.propTypes = {
  cover: string.isRequired,
}

export default Hero
