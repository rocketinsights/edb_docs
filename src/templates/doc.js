import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/layout';
import LeftNav from '../components/left-nav';
import TableOfContents from '../components/table-of-contents';
import TopBar from '../components/top-bar';
import SideNavigation from '../components/side-navigation';
import MainContent from '../components/main-content';
import Footer from '../components/footer';
import { leftNavs } from '../constants/left-navs';

export const query = graphql`
  query($path: String!) {
    mdx(fields: { path: { eq: $path } }) {
      frontmatter {
        title
      }
      fields {
        path
      }
      body
      tableOfContents
    }
  }
`;

const getProductUrlBase = path => {
  return path
    .split('/')
    .slice(0, 2)
    .join('/');
};

const getProductAndVersion = path => {
  return {
    product: path.split('/')[1],
    version: path.split('/')[2],
  };
};

const makeVersionArray = (versions, path) => {
  return versions.map(version => ({
    version: version,
    url: `${getProductUrlBase(path)}/${version}`,
  }));
};

const ContentRow = ({ children }) => (
  <div className="container p-0 mt-4">
    <Row>{children}</Row>
  </div>
);

const getNavOrder = (product, version, leftNavs) => {
  if (leftNavs[product] && leftNavs[product][version]) {
    return leftNavs[product][version];
  }
  return null;
};

const convertOrderToObjects = (navOrder, navLinks) => {
  let result = [];
  let navObject = { title: null, guides: [] };
  for (let item of navOrder) {
    if (!item.path && item.title) {
      if (navObject.guides.length > 0) {
        result.push({ ...navObject });
      }
      navObject = { title: item.title, guides: [] };
    } else if (item.path) {
      navObject.guides.push(getLinkItemFromPath(item.path, navLinks));
    }
  }
  result.push({ ...navObject });

  return result;
};

const getLinkItemFromPath = (path, navLinks) => {
  for (let item of navLinks) {
    const linkPath = item.fields.path;
    if (linkPath.includes(path) && linkPath.split('/').length === 4) {
      return item;
    }
  }
  return null;
};

const Sections = ({ sections }) => (
  <>
    {sections.map(section => (
      <Section section={section} key={section.title} />
    ))}
  </>
);

const Section = ({ section }) => (
  <div className="card-deck my-4">
    <div className="card rounded shadow-sm p-2">
      <div className="card-body">
        <h3 className="card-title balance-text">{section.title}</h3>
        {section.guides.map(guide => (
          <div key={guide.frontmatter.title}>
            <Link
              to={guide.fields.path}
              className="btn btn-link btn-block text-left p-0"
            >
              {guide.frontmatter.title}
            </Link>
            <div className="card-text small text-muted">
              {guide.frontmatter.description || guide.excerpt}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const DocTemplate = ({ data, pageContext }) => {
  const { mdx } = data;
  const { navLinks, versions } = pageContext;
  const versionArray = makeVersionArray(versions, mdx.fields.path);
  const { product, version } = getProductAndVersion(mdx.fields.path);
  const navOrder = getNavOrder(product, version, leftNavs);
  const sections = navOrder ? convertOrderToObjects(navOrder, navLinks) : null;

  return (
    <Layout>
      <TopBar />
      <Container className="p-0 d-flex bg-white">
        <SideNavigation>
          <LeftNav
            navLinks={navLinks}
            path={mdx.fields.path}
            versionArray={versionArray}
            navOrder={navOrder}
          />
        </SideNavigation>
        <MainContent>
          <h1 className="balance-text">{mdx.frontmatter.title}</h1>
          <ContentRow>
            <Col md={9}>
              <MDXRenderer>{mdx.body}</MDXRenderer>
            </Col>

            <Col md={3}>
              {mdx.tableOfContents.items && (
                <TableOfContents toc={mdx.tableOfContents.items} />
              )}
            </Col>
          </ContentRow>
          {navOrder && <Sections sections={sections} />}
          <Footer />
        </MainContent>
      </Container>
    </Layout>
  );
};

export default DocTemplate;
