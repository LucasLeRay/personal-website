import React from "react"
import { bool, string, number } from "prop-types"
import { Link } from "gatsby"

import {
  HotContainer,
  Container,
  Hot,
  LeftPart,
  RightPart,
  TimeRead,
} from "./ArticleCard.module.css"
import fire from "./fire.png"

function ArticleCard({ hot, cover, title, body, path, time }) {
  return (
    <div className={`${hot ? HotContainer : Container}`}>
      {hot && (
        <div className={Hot}>
          <img src={fire} alt="fire" />
          New
        </div>
      )}
      <div className={LeftPart}>
        <img src={cover} />
      </div>
      <div className={RightPart}>
        <h2>
          <Link to={path}>{title}</Link>
        </h2>
        <p>
          {body}
          <Link to={path}>Read more</Link>
        </p>
        <span className={TimeRead}>{`${time} min read`}</span>
      </div>
    </div>
  )
}

ArticleCard.propTypes = {
  hot: bool,
  cover: string.isRequired,
  title: string.isRequired,
  body: string.isRequired,
  time: number.isRequired,
  path: string.isRequired,
}

ArticleCard.defaultProps = {
  hot: false,
}

export default ArticleCard
