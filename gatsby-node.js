const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  // Ensures we are processing only markdown files
  if (node.internal.type === 'Mdx') {
    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: 'docs',
    });
    const productVersion = relativeFilePath
      .split('/')
      .slice(1, 3)
      .join('_v');

    // Creates new query'able field with name of 'path'
    createNodeField({
      node,
      name: 'path',
      value: relativeFilePath,
    });
    // Creates new query'able field with name of 'path'
    createNodeField({
      node,
      name: 'productVersion',
      value: productVersion,
    });
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            title
          }
          fields {
            path
            productVersion
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('failed to create docs', result.errors);
  }

  const docs = result.data.allMdx.nodes;

  docs.forEach(doc => {
    const navLinks = docs.filter(
      node => node.fields.productVersion === doc.fields.productVersion,
    );
    console.log(doc.fields.path);
    actions.createPage({
      path: doc.fields.path,
      component: require.resolve('./src/templates/post.js'),
      context: {
        navLinks: navLinks,
      },
    });
  });
};
