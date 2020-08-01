module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@common': '../common',
          '@components': 'src/components',
          '@global': 'src/global',
          '@graphql': 'src/graphql',
          '@images': 'static/images',
          '@layouts': 'src/layouts',
          '@pages': 'src/pages',
          '@styles': 'src/styles',
          '@utils': 'src/utils',
        },
        extensions: ['ts', 'tsx'],
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /static\/images\/.*\.svg$/,
        },
      },
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        headers: { Authorization: `Bearer ${process.env.JWT}` },
        entitiesArray: [
          {
            name: 'latestTlds',
            url: `${process.env.GATSBY_API_URL}/tld?latest`,
            method: 'get',
          },
          {
            name: 'upcomingTlds',
            url: `${process.env.GATSBY_API_URL}/tld?upcoming`,
            method: 'get',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-csp',
      options: {
        disableOnDev: true,
        mergeScriptHashes: true,
        mergeStyleHashes: false,
        directives: {
          'style-src': "'self' 'unsafe-inline'",
        },
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    'gatsby-plugin-use-query-params',
    'gatsby-plugin-netlify',
  ],
};
