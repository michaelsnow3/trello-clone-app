import React from 'react';
import { connect } from 'react-redux';

import './Card.css';
import editIcon from '../../images/editIcon.png';

// import actions
import { setTargetComponent } from '../../actions/moveComponentActions';
import { toggleSettingsMenu } from '../../actions/boardActions';

// import constants
import { CARD } from '../../constants/settingsMenuConstants';
import { DRAG_CARD } from '../../constants/moveComponentConstants';

const mapDispatchToProps = dispatch => {
  return {
    setTargetComponent: (targetComponent, componentType) =>
      dispatch(setTargetComponent(targetComponent, componentType)),
    toggleSettingsMenu: (menuType, targetId) =>
      dispatch(toggleSettingsMenu(menuType, targetId))
  };
};

const Card = ({ card, list, setTargetComponent, toggleSettingsMenu }) => {
  let handleCardClick = event => {
    event.stopPropagation();
    setTargetComponent(card, DRAG_CARD);
  };

  const handleEditClick = () => {
    toggleSettingsMenu(CARD, card.id);
  };

  const handleMouseUp = () => {
    setTargetComponent(null, null);
  };

  return (
    <div
      onMouseDown={handleCardClick}
      onMouseUp={handleMouseUp}
      className="cardContainer"
      draggable
    >
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
