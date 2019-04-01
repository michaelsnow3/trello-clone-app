import React from 'react';
import { connect } from 'react-redux';

import './Card.css';
import editIcon from '../componentSettings/editIcon.png';

// import actions
import { setTargetCard } from '../../actions/dragComponentActions';
import { toggleSettingsMenu } from '../../actions/activeBoardActions';

// import constants
import { CARD } from '../../constants/activeBoardConstants';

const mapDispatchToProps = dispatch => {
  return {
    setTargetCard: (card, list) => dispatch(setTargetCard(card, list)),
    toggleSettingsMenu: (menuType, targetId) =>
      dispatch(toggleSettingsMenu(menuType, targetId))
  };
};

const Card = ({ card, list, setTargetCard, toggleSettingsMenu }) => {
  let handleCardClick = () => {
    setTargetCard(card, list);
  };

  const handleEditClick = () => {
    toggleSettingsMenu(CARD, card.id);
  };

  return (
    <div onMouseDown={handleCardClick} className="cardContainer" draggable>
      <div className="cardText">{card.title}</div>
      <img
        src={editIcon}
        alt="edit icon"
        className="cardEditIcon"
        onClick={handleEditClick}
      />
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Card);
