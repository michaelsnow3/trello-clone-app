import React from 'react';
import { connect } from 'react-redux';

import './AddBoard.css';

// import actions
import { handleBoardTitleChange } from '../../actions/addBoardActions';

const mapStateToProps = state => {
  return {
    boardTitleValue: state.handleBoardTitleChange.value,
    userId: state.userInfo.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleBoardTitleChange: value => dispatch(handleBoardTitleChange(value))
  };
};

const AddBoard = ({
  boardTitleValue,
  handleBoardTitleChange,
  userId
}) => {
  const handleAddBoard = () => {
    // return if board has no title
    if (!boardTitleValue.length) return;
    
    fetch(`http://localhost:8888/board/new/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        boardTitleValue,
        userId
      })
    })
      .then(data => data.json())
      // .then(() => getUserBoards(userId));
  };

  const handleTextChange = event => {
    handleBoardTitleChange(event.target.value);
  };

  return (
    <div className="addBoardContainer">
      <input
        className="addBoardInput"
        value={boardTitleValue}
        onChange={handleTextChange}
      />
      <button onClick={handleAddBoard}>add board</button>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBoard);
