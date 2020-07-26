module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/articles`,
        name: `articles`,
      },
    },
    `gatsby-remark-embed-gist`,
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-embedder`, `gatsby-remark-embed-gist`],
      },
    },
  ],
}
