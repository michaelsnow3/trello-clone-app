import React from 'react';

import './Card.css'

const Card = ({ card }) => {
  return <div className='cardContainer'>{card.title}</div>;
};

export default Card;
