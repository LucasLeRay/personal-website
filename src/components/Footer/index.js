import React from "react"
import MovingWave from "@bit/lucasleray.landing-stuff.moving-wave"

import { Container, WaveWrapper } from "./Footer.module.css"

import emojiHeart from "./img/heart.png"

function Footer() {
  return (
    <section id="footer" className={Container}>
      <MovingWave invert className={WaveWrapper} />
    </section>
  )
}

export default Footer
