import React from 'react'
import { Link } from "gatsby"

import { Container, WrittenBy } from './AboutMe.module.css'

function AboutMe() {
  return <div className={Container}>
    <img alt="Me" src="/img/me/me.png" />
    <div className={WrittenBy}>
      <span>Written by</span>
      <Link to="/">Lucas Le Ray</Link>
    </div>
  </div>
}

export default AboutMe
