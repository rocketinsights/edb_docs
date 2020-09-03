import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Icon, { iconNames } from '../components/icon/';
import { Button } from 'react-bootstrap';

const PdfDownload = ({ path }) => {
  const data = useStaticQuery(graphql`
    {
      allFile(filter: { ext: { eq: ".pdf" } }) {
        nodes {
          publicURL
          relativeDirectory
        }
      }
    }
  `);

  const file = data.allFile.nodes.find(
    pdf => `/${pdf.relativeDirectory}` === path,
  );

  if (file) {
    return (
      <a href={file.publicURL}>
        <Button variant="outline-info" size="sm" className="download-pdf mt-2">
          <Icon
            iconName={iconNames.DOWNLOAD}
            className="fill-orange"
            width="18"
            height="18"
            circle={false}
          />{' '}
          Download PDF
        </Button>
      </a>
    );
  }
  return null;
};

export default PdfDownload;
