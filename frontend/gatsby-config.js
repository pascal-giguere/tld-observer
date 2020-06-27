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
          '@components': 'src/components',
          '@images': 'src/images',
          '@layouts': 'src/layouts',
          '@pages': 'src/pages',
        },
        extensions: ['ts', 'tsx'],
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
  ],
};
