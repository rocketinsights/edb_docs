import React from 'react';
import { Link } from 'gatsby';
import DottedBox from '../components/icons/dotted-box';

const FullCard = ({ card }) => (
  <div className="card rounded shadow-sm p-2">
    <Link to={card.fields.path}>
      <DottedBox className="opacity-1 mt-3 ml-3" width="100" height="100" />
    </Link>
    <div className="card-body">
      <h3 className="card-title balance-text">
        <Link to={card.fields.path}>{card.frontmatter.title}</Link>
      </h3>

      <p className="card-text">{card.frontmatter.description}</p>

      {card.children.map(child => (
        <Link
          key={child.fields.path}
          to={child.fields.path}
          className="btn btn-link btn-block text-left p-0"
        >
          {child.frontmatter.title}
        </Link>
      ))}
    </div>
  </div>
);

const SimpleCard = ({ card }) => (
  <div className="card rounded shadow-sm p-2">
    <div className="card-body">
      <h3 className="card-title balance-text">
        <Link className="stretched-link" to={card.fields.path}>
          {card.frontmatter.title}
        </Link>
      </h3>

      <p className="card-text">{card.frontmatter.description}</p>
    </div>
  </div>
);

const CardDecks = ({ cards, groupSize = 3, cardType = 'simple' }) => {
  let groupedCards = [];
  for (let i = 0; i < cards.length; i += groupSize) {
    let group = [];
    for (let j = 0; j < groupSize; j++) {
      if (cards[i + j]) {
        group.push(cards[i + j]);
      }
    }
    groupedCards.push(group);
  }

  return (
    <>
      {groupedCards.map((cardGroup, i) => {
        return (
          <div key={i} className="card-deck mt-4">
            {cardGroup.map(card => {
              switch (cardType) {
                case 'full': {
                  return <FullCard key={card.fields.path} card={card} />;
                }
                case 'simple': {
                  return <SimpleCard key={card.fields.path} card={card} />;
                }
                default: {
                  return <></>;
                }
              }
            })}
          </div>
        );
      })}
    </>
  );
};

export default CardDecks;
