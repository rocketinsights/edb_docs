// this patch is required to consistently load all the doc files
const realFs = require('fs');
const gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(realFs);

const { createFilePath } = require(`gatsby-source-filesystem`);
const { exec } = require("child_process");

const sortVersionArray = (versions) => {
  return versions.map(version => version.replace(/\d+/g, n => +n+100000)).sort()
                 .map(version => version.replace(/\d+/g, n => +n-100000));
}

const replacePathVersion = (path, version = 'latest') => {
  const splitPath = path.split('/');
  const postVersionPath = splitPath.slice(3).join('/');
  return `/${splitPath[1]}/${version}${postVersionPath.length > 0 ? `/${postVersionPath}` : ''}`;
}

const buildCustomSlugPath = (path, slug) => {
  if (!slug) { return path; }

  const splitPath = path.split('/');
  const slugIndex = Math.max(splitPath.length - 1, 3);
  if (splitPath[slugIndex]) { splitPath[slugIndex] = slug; }

  return splitPath.join('/');
}

const productLatestVersionCache = [];

exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  // Ensures we are processing only markdown files
  if (
    node.internal.type === 'Mdx' &&
    node.fileAbsolutePath.includes('/docs/')
  ) {
    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
    let relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: 'docs',
    });

    relativeFilePath = relativeFilePath.substring(
      0,
      relativeFilePath.length - 1,
    );
    const product = relativeFilePath.split('/')[1];
    const version = relativeFilePath.split('/')[2];

    const { slug } = node.frontmatter;
    const path = buildCustomSlugPath(relativeFilePath, slug);

    // Creates new query'able fields
    createNodeField({
      node,
      name: 'path',
      value: path,
    });
    createNodeField({
      node,
      name: 'product',
      value: product,
    });
    createNodeField({
      node,
      name: 'version',
      value: version,
    });
    createNodeField({
      node,
      name: 'topic',
      value: 'null',
    });
  }
  if (
    node.internal.type === 'Mdx' &&
    node.fileAbsolutePath.includes('/advocacy_docs/')
  ) {
    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
    let relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: 'advocacy_docs',
    });

    relativeFilePath = relativeFilePath.substring(
      0,
      relativeFilePath.length - 1,
    );
    const topic = relativeFilePath.split('/')[2];

    // Creates new query'able field with name of 'path'
    createNodeField({
      node,
      name: 'path',
      value: relativeFilePath,
    });
    createNodeField({
      node,
      name: 'topic',
      value: topic,
    });
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createNodeField } = actions;
  if (!createNodeField) {
    throw 'adasds'
  }

  const result = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            title
            navTitle
            description
            redirects
            iconName
            slug
            katacodaPages {
              scenario
              account
            }
          }
          excerpt(pruneLength: 280)
          fields {
            path
            product
            version
            topic
          }
          fileAbsolutePath
        }
      }
    }
  `);

  const { nodes } = result.data.allMdx;

  if (result.errors) {
    reporter.panic('failed to create docs', result.errors);
  }

  for (let node of nodes) {
    if (!node.frontmatter.title) {
      let file;
      if (node.fileAbsolutePath.includes('index.mdx')) {
        file = node.fields.path + '/index.mdx';
      } else {
        file = node.fields.path + '.mdx';
      }
      reporter.warn(file + ' has no title');
    }
  }

  // const finalizedPaths = [];
  nodes.forEach(node => {
    const { path } = node.fields;
    const { slug } = node.frontmatter;

    // finalizedPaths.push({
    //   nodePath: path,
    //   path: buildCustomSlugPath(path, slug),
    // });

    // createNodeField({
    //   node: node,
    //   name: 'finalizedPath',
    //   value: buildCustomSlugPath(path, slug),
    // })

    node.finalizedPath = buildCustomSlugPath(path, slug);
  });

  const docs = nodes.filter(file => !!file.fields.version);
  const learn = nodes.filter(file => !file.fields.version);

  const folderIndex = {};

  nodes.forEach(doc => {
    const { path } = doc.fields;
    const { redirects } = doc.frontmatter;

    // console.log(doc.finalizedPath);

    if (redirects) {
      redirects.forEach(fromPath => {
        actions.createRedirect({
          fromPath,
          toPath: doc.finalizedPath,
          redirectInBrowser: true,
          isPermanent: true,
        });
      });
    }

    const splitPath = path.split('/');
    const subPath = splitPath.slice(0, splitPath.length - 1).join('/');
    const { fileAbsolutePath } = doc;
    if (fileAbsolutePath.includes('index.mdx')) {
      folderIndex[path] = true;
    } else {
      if (!folderIndex[subPath]) {
        folderIndex[subPath] = false;
      }
    }
  });

  for (let key of Object.keys(folderIndex)) {
    if (!folderIndex[key]) {
      reporter.warn(key + ' has no index.mdx');
    }
  }

  const versionIndex = {};

  docs.forEach(doc => {
    const { product, version } = doc.fields;

    if (!versionIndex[product]) {
      versionIndex[product] = [version];
    } else {
      if (!versionIndex[product].includes(version)) {
        versionIndex[product].push(version);
      }
    }
  });

  for (const product in versionIndex) {
    versionIndex[product] = sortVersionArray(versionIndex[product]).reverse();
  }

  docs.forEach(doc => {
    const isLatest = versionIndex[doc.fields.product][0] === doc.fields.version;
    if (isLatest) {
      actions.createRedirect({
        fromPath: doc.fields.path,
        toPath: replacePathVersion(doc.fields.path),
        redirectInBrowser: true,
        isPermanent: false,
        force: true,
      });
    }

    const navLinks = docs.filter(
      node =>
        node.fields.product === doc.fields.product &&
        node.fields.version === doc.fields.version,
    );

    // const path = buildCustomSlugPath(doc.fields.path, doc.frontmatter.slug);
    // console.log(path);

    const path = doc.fields.path;
    console.log(path);

    actions.createPage({
      path: isLatest ? replacePathVersion(path) : path,
      component: require.resolve('./src/templates/doc.js'),
      context: {
        navLinks: navLinks,
        versions: versionIndex[doc.fields.product],
        nodePath: doc.fields.path,
        potentialLatestPath: replacePathVersion(path), // the latest url for this path (may not exist!)
        potentialLatestNodePath: replacePathVersion(
          doc.fields.path,
          versionIndex[doc.fields.product][0]
        ), // the latest version number path (may not exist!), needed for query
      },
    });
  });

  learn.forEach(doc => {
    const navLinks = learn.filter(
      node => node.fields.topic === doc.fields.topic,
    );
    const advocacyDocsRepoUrl = 'https://github.com/rocketinsights/edb_docs_advocacy';
    const githubLink = advocacyDocsRepoUrl +
      '/edit/master/advocacy_docs' +
      doc.fields.path +
      (doc.fileAbsolutePath.includes('index.mdx') ? '/index.mdx' : '.mdx');
    const githubIssuesLink = advocacyDocsRepoUrl +
      '/issues/new?title=Regarding%20' +
      encodeURIComponent(doc.fields.path) +
      (doc.fileAbsolutePath.includes('index.mdx') ? '/index.mdx' : '.mdx');
    actions.createPage({
      path: doc.fields.path,
      component: require.resolve('./src/templates/learn-doc.js'),
      context: {
        navLinks: navLinks,
        githubLink: githubLink,
        githubIssuesLink: githubIssuesLink,
      },
    });

    (doc.frontmatter.katacodaPages || []).forEach(katacodaPage => {
      if (!katacodaPage.scenario || !katacodaPage.account) {
        raise `katacoda scenario or account missing for ${doc.fields.path}`;
      }

      actions.createPage({
        path: `${doc.fields.path}/${katacodaPage.scenario}`,
        component: require.resolve('./src/templates/katacoda-page.js'),
        context: {
          ...katacodaPage,
          learn: {
            title: doc.frontmatter.title,
            description: doc.frontmatter.description,
          },
        },
      })
    });
  });

  const sha = await new Promise((resolve, reject) => {
    exec("git rev-parse HEAD", (error, stdout, stderr) => resolve(stdout));
  });

  const branch = await new Promise((resolve, reject) => {
    exec("git branch --show-current", (error, stdout, stderr) => resolve(stdout));
  });

  actions.createPage({
    path: 'build-info',
    component: require.resolve('./src/templates/build-info.js'),
    context: {
      sha: sha,
      branch: branch,
      buildTime: Date.now(),
    },
  });
};
