import React, { useState } from 'react';
import { connect } from 'react-redux';

import './AddCard.css';

// import actions
import { setBoardContent } from '../../actions/boardContentActions';
import { toggleSettingsMenu } from '../../actions/activeBoardActions';

import { postFetch } from '../../fetchRequests';

const mapDispatchToProps = dispatch => {
  return {
    setBoardContent: boardId => setBoardContent(boardId)(dispatch),
    toggleSettingsMenu: () => dispatch(toggleSettingsMenu(null, null))
  };
};

const AddCard = ({ boardId, listId, setBoardContent, toggleSettingsMenu }) => {
  let [titleValue, setTitleValue] = useState('');
  const handleAddCard = () => {
    // return if list has no title
    if (!titleValue.length) return;

    let body = {
      titleValue,
      listId
    };
    postFetch('/card/new/', body)
      .then(() => {
        setBoardContent(boardId);
        toggleSettingsMenu()
      })
      .catch(error => console.log('error adding user card', error));
  };

  const handleTextChange = event => {
    setTitleValue(event.target.value);
  };

  return (
    <div className="addCardContainer">
      <input
        className="addCardInput"
        value={titleValue}
        onChange={handleTextChange}
      />
      <button onClick={handleAddCard}>add card</button>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(AddCard);
