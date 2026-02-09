module.exports = {
  siteMetadata: {
    title: `Dr. Fatih Nayebi`,
    description: `AI Leader, Founder & CEO of OODARIS AI, and Assistant Professor at McGill University`,
    siteUrl: `https://fatihnayebi.com`,
    author: `Dr. Fatih Nayebi`,
  },
  flags: {
    PARALLEL_QUERY_RUNNING: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    FAST_DEV: true,
    DEV_SSR: false,
    PRESERVE_WEBPACK_CACHE: true,
    FUNCTIONS: true,
    LMDB_STORE: false,
    DEV_WEBPACK_CACHE: true,
    PARALLEL_SOURCING: true
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`),
          require(`autoprefixer`),
        ],
      },
    },
  ],
}
