import React from 'react';
import { connect } from 'react-redux';

import './AddBoard.css';

// import actions
import { handleBoardTitleChange } from '../../actions/onValueChangeActions';
import { getUserBoards } from '../../actions/userInfoActions';

import { postFetch } from '../../fetchRequests';

const mapStateToProps = state => {
  return {
    boardTitleValue: state.handleBoardTitleChange.value,
    userId: state.userInfo.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleBoardTitleChange: value => dispatch(handleBoardTitleChange(value)),
    getUserBoards: userId => getUserBoards(userId)(dispatch)
  };
};

const AddBoard = ({
  boardTitleValue,
  handleBoardTitleChange,
  userId,
  getUserBoards
}) => {
  const handleAddBoard = () => {
    // return if board has no title
    if (!boardTitleValue.length) return;

    let body = {
      boardTitleValue,
      userId
    }
    postFetch('/board/new/', body)
      .then(data => data.json())
      .then(() => getUserBoards(userId))
      .catch(error => console.log('error adding/fetching user boards', error));
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
