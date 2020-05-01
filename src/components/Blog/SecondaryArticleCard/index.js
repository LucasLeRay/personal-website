import React from "react"
import { bool, string, number } from "prop-types"
import { Link } from "gatsby"

import {
  HotContainer,
  Container,
  LeftPart,
  RightPart,
  TimeRead,
} from "./SecondaryArticleCard.module.css"

function SecondaryArticleCard({ cover, title, body, path, time }) {
  return (
    <div className={Container}>
      <div className={LeftPart}>
        <img src={cover} />
      </div>
      <div className={RightPart}>
        <h2>
          <Link to={path}>{title}</Link>
        </h2>
        <p>{body}</p>
        <span className={TimeRead}>{`${time} min read`}</span>
      </div>
    </div>
  )
}

SecondaryArticleCard.propTypes = {
  cover: string.isRequired,
  title: string.isRequired,
  body: string.isRequired,
  time: number.isRequired,
  path: string.isRequired,
}

export default SecondaryArticleCard
