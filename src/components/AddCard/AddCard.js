import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import './AddCard.css';

// import actions
import { setBoardContent } from '../../actions/boardContentActions';
import { postFetch } from '../../fetchRequests';

const mapDispatchToProps = dispatch => {
  return {
    setBoardContent: boardId => setBoardContent(boardId)(dispatch)
  };
};

const AddCard = ({ boardId, listId, setBoardContent }) => {
  let [titleValue, setTitleValue] = useState('');
  let [showInput, setShowInput] = useState(false);

  const handleAddCard = () => {
    // return if list has no title
    if (!titleValue.length) {
      setShowInput(false);
      return;
    }

    let body = {
      titleValue,
      listId
    };
    setTitleValue('');

    postFetch('/card/new/', body)
      .then(() => {
        setBoardContent(boardId);
        setShowInput(false);
      })
      .catch(error => console.log('error adding user card', error));
  };

  const handleTextChange = event => {
    setTitleValue(event.target.value);
  };

  if (!showInput) {
    return (
      <div onClick={() => setShowInput(true)} className="addCardPlaceholder">
        add card
      </div>
    );
  }

  return (
    <div className="addCardContainer">
      <textarea
        autoFocus
        className="addCardInput"
        value={titleValue}
        onChange={handleTextChange}
      />
      <Button className="addCardButton" onClick={handleAddCard}>
        add
      </Button>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(AddCard);
