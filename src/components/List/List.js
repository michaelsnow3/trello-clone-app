import React from 'react';

import './List.css';

// import components
import Card from '../Card/Card';

const List = ({ list }) => {
  const listCards = list.listCards.reduce((acc, card, i) => {
    acc.push(<Card key={i} card={card} />);
    return acc;
  }, []);

  return (
    <div className="listContainer">
      {list.listTitle}
      <div>{listCards}</div>
    </div>
  );
};

export default List;
