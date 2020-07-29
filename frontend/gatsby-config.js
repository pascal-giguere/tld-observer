module.exports = {
  proxy: {
    prefix: '/member',
    url: process.env.GATSBY_PROXY_URL,
  },
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
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
  ],
};
