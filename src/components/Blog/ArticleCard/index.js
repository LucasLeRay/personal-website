import React from "react"
import { string, number } from "prop-types"
import { Link } from "gatsby"

import {
  Container,
  LeftPart,
  RightPart,
  TimeRead,
} from "./ArticleCard.module.css"

function ArticleCard({ cover, title, body, path, time }) {
  return (
    <div className={Container}>
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

ArticleCard.propTypes = {
  cover: string.isRequired,
  title: string.isRequired,
  body: string.isRequired,
  time: number.isRequired,
  path: string.isRequired,
}

export default ArticleCard
