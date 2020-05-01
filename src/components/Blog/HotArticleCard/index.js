import React from "react"
import { string, number } from "prop-types"
import { Link } from "gatsby"

import {
  Container,
  Hot,
  LeftPart,
  RightPart,
  TimeRead,
} from "./HotArticleCard.module.css"
import fire from "./fire.png"

function HotArticleCard({ cover, title, body, path, time }) {
  return (
    <div className={Container}>
      <div className={Hot}>
        <img src={fire} alt="fire" />
        New
      </div>
      <div className={LeftPart}>
        <Link to={path}>
          <img alt={title} src={cover} />
        </Link>
      </div>
      <div className={RightPart}>
        <h2>
          <Link to={path}>{title}</Link>
        </h2>
        <Link to={path}>
          <p>{body}</p>
        </Link>
        <Link to={path}>
          <span className={TimeRead}>{`${time} min read`}</span>
        </Link>
      </div>
    </div>
  )
}

HotArticleCard.propTypes = {
  cover: string.isRequired,
  title: string.isRequired,
  body: string.isRequired,
  time: number.isRequired,
  path: string.isRequired,
}

export default HotArticleCard
