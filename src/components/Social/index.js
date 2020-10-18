import React from "react"

import { Container } from "./Social.module.css"

function Social() {
  return (
    <div className={Container}>
      <a
        target="_blank"
        href="https://twitter.com/Lucas_Le_Ray"
        rel="noopener noreferrer"
      >
        <img src="/img/twitter.png" alt="twitter" />
      </a>
      <a
        target="_blank"
        href="https://www.linkedin.com/in/lucas-le-ray-89a61a135/"
        rel="noopener noreferrer"
      >
        <img src="/img/linkedin.png" alt="linkedin" />
      </a>
      <a
        target="_blank"
        href="https://www.facebook.com/lucas.leray.270"
        rel="noopener noreferrer"
      >
        <img src="/img/facebook.png" alt="facebook" />
      </a>
      <a
        target="_blank"
        href="https://github.com/LucasLeRay"
        rel="noopener noreferrer"
      >
        <img src="/img/github.png" alt="github" />
      </a>
      <a
        target="_blank"
        href="https://www.producthunt.com/@lucas_le_ray"
        rel="noopener noreferrer"
      >
        <img src="/img/producthunt.png" alt="product hunt" />
      </a>
      <a
        target="_blank"
        href="https://www.indiehackers.com/lucasleray"
        rel="noopener noreferrer"
      >
        <img src="/img/indiehacker.png" alt="indie hacker" />
      </a>
    </div>
  )
}

export default Social
