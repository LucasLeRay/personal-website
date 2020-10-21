module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-react-svg",
    },
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
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-embedder`,
          `gatsby-remark-embed-gist`, {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: '>',
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              escapeEntities: {},
            },
          }
        ],
      },
    },
  ],
  siteMetadata: {
    title: "Lucas Le Ray",
    description: "Hi ! I'm Lucas, french web developer and entrepreneur.",
    url: "https://lucas-le-ray.com",
    twitterUsername: "@Lucas_Le_Ray",
  },
}
