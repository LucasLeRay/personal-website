import React from "react"
import HotArticleCard from "../HotArticleCard"
import ArticleCard from "../ArticleCard"
import {
  Container,
  HotArticleWrapper,
  ArticlesWrapper,
} from "./Articles.module.css"

function Articles({ hotPost, posts }) {
  return (
    <div className={Container}>
      <div className={HotArticleWrapper}>
        <HotArticleCard
          path={hotPost.path}
          cover={hotPost.cover}
          title={hotPost.title}
          body={hotPost.body}
          time={hotPost.time}
        />
      </div>
      <div className={ArticlesWrapper}>
        {posts.map(post => (
          <ArticleCard
            path={post.path}
            cover={post.cover}
            title={post.title}
            body={post.body}
            time={post.time}
          />
        ))}
      </div>
    </div>
  )
}

export default Articles
