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
          '@images': 'static/images',
          '@components': 'src/components',
          '@global': 'src/global',
          '@layouts': 'src/layouts',
          '@pages': 'src/pages',
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
