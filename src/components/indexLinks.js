import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

const List = styled('ul')`
  padding: 0;
  list-style: none;
`;

const IndexLinks = ({ indexLinkList }) => (
  <>
    {indexLinkList.map(section => {
      return (
        <>
          <div>{section.sectionName}</div>
          <List>
            {section.links.map(link => {
              return (
                <li>
                  <Link to={link.url}>{link.title}</Link>
                </li>
              );
            })}
          </List>
        </>
      );
    })}
  </>
);

export default IndexLinks;
