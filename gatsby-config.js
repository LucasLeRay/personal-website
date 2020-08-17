module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-115465336-3",
      },
    },
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
