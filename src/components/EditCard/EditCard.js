import React, { useState } from 'react';
import { connect } from 'react-redux';

import './EditCard.css';

import { postFetch } from '../../fetchRequests';

// import actions
import { toggleSettingsMenu } from '../../actions/boardActions';
import { setBoardContent } from '../../actions/boardActions';

const mapStateToProps = state => {
  return {
    cardId: state.settingsMenu.targetId,
    activeBoard: state.activeBoard.board
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSettingsMenu: () => dispatch(toggleSettingsMenu(null, null)),
    setBoardContent: boardId => setBoardContent(boardId)(dispatch)
  };
};

const EditCard = ({
  cardId,
  activeBoard,
  toggleSettingsMenu,
  setBoardContent
}) => {
  let [cardTitleValue, setCardTitleValue] = useState('');

  let boardId = activeBoard.id;

  const handleEditCardTitle = () => {
    let body = { cardId, title: cardTitleValue };
    postFetch('/card/edit/title', body)
      .then(() => setCardTitleValue(''))
      .then(() => {
        toggleSettingsMenu();
        setBoardContent(boardId);
      });
  };

  const handleInputChange = event => {
    setCardTitleValue(event.target.value);
  };
  return (
    <div className="editCardContainer">
      <textarea
        autoFocus
        onChange={handleInputChange}
        value={cardTitleValue}
        className="editCardInput"
      />
      <button className="editCardButton" onClick={handleEditCardTitle}>
        edit title
      </button>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCard);
