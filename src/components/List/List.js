import React from 'react';

import './List.css';

// import components
import Card from '../Card/Card';
import AddCard from '../AddCard/AddCard'

const List = ({ list, boardId }) => {
  const listCards = list.listCards.reduce((acc, card, i) => {
    acc.push(<Card key={i} card={card} />);
    return acc;
  }, []);
  listCards.push(<AddCard key={-1} boardId={boardId} listId={list.listId} />)

  return (
    <div className="listContainer">
      <div className='listTitle'>{list.listTitle}</div>
      <div>{listCards}</div>
    </div>
  );
};

export default List;
