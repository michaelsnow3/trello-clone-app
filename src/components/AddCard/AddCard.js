import React, { useState } from 'react';
import { connect } from 'react-redux';

import './AddCard.css';

// import actions
import { setBoardContent } from '../../actions/boardContentActions';

const mapDispatchToProps = dispatch => {
  return {
    setBoardContent: boardId => setBoardContent(boardId)(dispatch)
  };
};

const AddCard = ({ boardId, listId, setBoardContent }) => {
  let [titleValue, setTitleValue] = useState('');
  const handleAddCard = () => {
    // return if list has no title
    if (!titleValue.length) return;

    fetch(`http://localhost:8888/card/new/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        titleValue,
        listId
      })
    })
      .then(() => {
        setBoardContent(boardId);
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
