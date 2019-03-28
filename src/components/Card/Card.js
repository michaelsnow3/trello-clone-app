import React from 'react';
import { connect } from 'react-redux';

import './Card.css';

// import actions
import { setTargetCard } from '../../actions/moveCardActions';

const mapDispatchToProps = dispatch => {
  return {
    setTargetCard: (card, list) => dispatch(setTargetCard(card, list))
  };
};

const Card = ({ card, list, setTargetCard }) => {
  let handleCardClick = () => {
    setTargetCard(card, list);
  };
  return (
    <div onClick={handleCardClick} className="cardContainer">
      {card.title}
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Card);
