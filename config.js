const config = {
  gatsby: {
    pathPrefix: '/postgres-docs-test',
    siteUrl: 'https://github.com/rocketinsights/postgres-docs-test',
    gaTrackingId: null,
    trailingSlash: false,
  },
  header: {
    logo: '',
    logoLink: '',
    title: 'title',
    githubUrl: '',
    helpUrl: '',
    tweetText: '',
    social: '',
    links: [{ text: '', link: '' }],
    search: {
      enabled: false,
      indexName: '',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [],
    collapsedNav: [
      // '/codeblock', // add trailing slash if enabled above
    ],
    links: [
      { text: 'Get Support', link: 'https://www.enterprisedb.com/' },
      { text: 'Feedback', link: 'https://www.enterprisedb.com/' },
    ],
    frontline: false,
    ignoreIndex: true,
    title: 'EDB Docs',
  },
  siteMetadata: {
    title: 'EDB Docs',
    description:
      'Documentation built with mdx. Viewable at https://rocketinsights.github.io/postgres-docs-test/',
    ogImage: null,
    docsLocation: 'https://github.com/rocketinsights/postgres-docs-test/edit/master/content',
    favicon: '',
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'Postgres Docs Test',
      short_name: 'postgresDocsTest',
      start_url: '/',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/pwa-512.png',
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
};

module.exports = config;
