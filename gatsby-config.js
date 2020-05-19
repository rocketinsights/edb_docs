const config = require('./config');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const docQuery = `
{
  allMdx {
    nodes {
      frontmatter {
        title
      }
      excerpt
      id
      fields {
        product
        path
        version
      }
    }
  }
 }
`;

const transformNodeDocs = node => {
  let newNode = node;
  newNode['title'] = node.frontmatter.title;
  newNode['path'] = node.fields.path;
  newNode['product'] = node.fields.product;
  newNode['version'] = node.fields.version;
  delete newNode['frontmatter'];
  delete newNode['fields'];
  return newNode;
};

const transformNodeLearn = node => {
  let newNode = node;
  newNode['title'] = node.frontmatter.title;
  newNode['path'] = node.fields.path;
  delete newNode['frontmatter'];
  delete newNode['fields'];
  return newNode;
};

const products = ['epas', 'cds', 'ark'];

const queries = [
  {
    query: docQuery,
    transformer: ({ data }) =>
      data.allMdx.nodes
        .filter(
          node =>
            !!node.fields.product && products.includes(node.fields.product),
        )
        .map(node => transformNodeDocs(node)),
    indexName: 'edb-products', // overrides main index name, optional
  },
  {
    query: docQuery,
    transformer: ({ data }) =>
      data.allMdx.nodes
        .filter(
          node =>
            !!node.fields.product && !products.includes(node.fields.product),
        )
        .map(node => transformNodeDocs(node)),
    indexName: 'edb-tools', // overrides main index name, optional
  },
  {
    query: docQuery,
    transformer: ({ data }) =>
      data.allMdx.nodes
        .filter(node => !node.fields.product)
        .map(node => transformNodeLearn(node)),
    indexName: 'advocacy', // overrides main index name, optional
  },
];

module.exports = {
  pathPrefix: config.gatsby.pathPrefix,
  siteMetadata: {
    title: 'Docs Site',
    description: 'A docs site',
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve('./src/components/layout.js'),
        },
        gatsbyRemarkPlugins: [
          { resolve: 'gatsby-remark-images' },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              isIconAfterHeader: true,
            },
          },
        ],
        plugins: [{ resolve: 'gatsby-remark-images' }],
      },
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'docs',
        path: 'docs',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'learn_docs',
        path: 'learn_docs',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: 'static/images',
      },
    },
    {
      // This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID || 'none',
        apiKey: process.env.ALGOLIA_API_KEY || 'none',
        indexName: process.env.ALGOLIA_INDEX_NAME || 'none', // for all queries
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
  ],
};
