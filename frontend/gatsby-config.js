const fs = require('fs');
const manifest = fs.readFileSync(__dirname + '/static/manifest.webmanifest', 'utf8');

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
    {
      resolve: 'gatsby-plugin-manifest',
      options: JSON.parse(manifest),
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
  ],
};
