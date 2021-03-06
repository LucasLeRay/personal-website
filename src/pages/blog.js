import React from "react"
import { graphql } from 'gatsby'

import Hero from "../components/Blog/Hero"
import Footer from "../components/Footer"
import Articles from "../components/Blog/Articles"
import Social from "../components/Social"
import SEO from "../components/SEO"

export default ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  let posts = edges.map(({ node }) => ({
    body: node.excerpt,
    path: node.frontmatter.path,
    cover: node.frontmatter.cover,
    title: node.frontmatter.title,
    time: node.frontmatter.time,
  }))
  return (
    <>
      <Hero />
      <Articles hotPost={posts.shift()} posts={posts} />
      <Footer />
      <Social />
      <SEO />
    </>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 160)
          frontmatter {
            path
            title
            time
            cover
          }
        }
      }
    }
  }
`
