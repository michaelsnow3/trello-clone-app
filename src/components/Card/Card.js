import React from 'react';
import { connect } from 'react-redux';

import './Card.css';
import editIcon from '../componentSettings/editIcon.png';

// import actions
import { setTargetComponent} from '../../actions/moveComponentActions';
import { toggleSettingsMenu } from '../../actions/activeBoardActions';

// import constants
import { CARD } from '../../constants/activeBoardConstants';
import { DRAG_CARD } from '../../constants/moveComponentConstants'

const mapDispatchToProps = dispatch => {
  return {
    setTargetComponent: (targetComponent, hoveredComponent, componentType) => dispatch(setTargetComponent(targetComponent, hoveredComponent, componentType)),
    toggleSettingsMenu: (menuType, targetId) =>
      dispatch(toggleSettingsMenu(menuType, targetId))
  };
};

const Card = ({ card, list, setTargetComponent, toggleSettingsMenu }) => {
  let handleCardClick = () => {
    setTargetComponent(card, list, DRAG_CARD);
  };

  const handleEditClick = () => {
    toggleSettingsMenu(CARD, card.id);
  };

  const handleMouseUp = () => {
    setTargetComponent(null, null, null)
  }

  return (
    <div onMouseDown={handleCardClick} onMouseUp={handleMouseUp} className="cardContainer" draggable>
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
