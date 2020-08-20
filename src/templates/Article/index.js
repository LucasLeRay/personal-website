import React from "react"
import { graphql } from "gatsby"
import {
  Container,
  Content,
  Data,
  TimeRead,
  Social,
  ArticleBody,
  Share,
} from "./Article.module.css"
import Hero from "../../components/Article/Hero"
import Footer from "../../components/Footer"
import SEO from "../../components/SEO"

export default function Template({ data }) {
  const { markdownRemark } = data
  const {
    frontmatter: { title, cover, time, path },
    html,
    abstract,
  } = markdownRemark
  const twitterLink = `http://twitter.com/intent/tweet?text=Currently%20reading:%20'${title}'%20https://lucas-le-ray.com${path}`
  const facebookLink = `http://www.facebook.com/sharer.php?u=https://lucas-le-ray.com${path}`
  const linkedinLink = `https://www.linkedin.com/sharing/share-offsite/?url=https://lucas-le-ray.com${path}`

  return (
    <div className={Container}>
      <Hero cover={cover} />
      <div className={Content}>
        <h1>{title}</h1>
        <div className={Data}>
          <span className={TimeRead}>{`${time} min read -`}</span>
          <div className={Social}>
            <a href={twitterLink} target="_blank" rel="noopener noreferrer">
              <img alt="twitter" src="/img/twitter.png" />
            </a>
            <a href={facebookLink} target="_blank" rel="noopener noreferrer">
              <img alt="facebook" src="/img/facebook.png" />
            </a>
            <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
              <img alt="linkedin" src="/img/linkedin.png" />
            </a>
          </div>
        </div>
        <div
          className={ArticleBody}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div className={Share}>
          Share on
          <div className={Social}>
            <a href={twitterLink} target="_blank" rel="noopener noreferrer">
              <img alt="twitter" src="/img/twitter.png" />
            </a>
            <a href={facebookLink} target="_blank" rel="noopener noreferrer">
              <img alt="facebook" src="/img/facebook.png" />
            </a>
            <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
              <img alt="linkedin" src="/img/linkedin.png" />
            </a>
          </div>
        </div>
      </div>
      <Footer />
      <SEO
        title={title}
        description={abstract}
        image={cover}
        article
      />
    </div>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      abstract: excerpt(pruneLength: 160)
      frontmatter {
        path
        title
        time
        cover
      }
    }
  }
`
