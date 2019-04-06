import React, { useState } from 'react';
import { connect } from 'react-redux';

import './AddBoard.css';
import closeIcon from './closeIcon.png';

// import components
import Scroll from '../Scroll/Scroll';
import BoardColourOptions from '../BoardColourOptions/BoardColourOptions';

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
  getUserBoards,
  setDisplayAddBoard
}) => {
  const [boardColour, setBoardColour] = useState('white');
  const handleAddBoard = () => {
    // return if board has no title
    if (!boardTitleValue.length) {
      setDisplayAddBoard(false);
      return;
    }

    let body = {
      boardTitleValue,
      userId,
      boardColour
    };
    postFetch('/board/new/', body)
      .then(data => data.json())
      .then(() => {
        getUserBoards(userId);
        handleBoardTitleChange('');
        setDisplayAddBoard(false);
      })
      .catch(error => {
        console.log('error adding/fetching user boards', error);
        setDisplayAddBoard(false);
      });
  };

  const handleTextChange = event => {
    handleBoardTitleChange(event.target.value);
  };

  return (
    <div className="addBoardContainer" style={{ backgroundColor: boardColour }}>
      <img
        className="addBoardCloseIcon"
        src={closeIcon}
        alt="close icon"
        onClick={() => setDisplayAddBoard(false)}
      />
      <div className="addBoardHeader">Add Board</div>
      <input
        className="addBoardInput"
        value={boardTitleValue}
        onChange={handleTextChange}
        placeholder="Board Title"
      />
      <div>Background Colour</div>
      <Scroll>
        <BoardColourOptions setBoardColour={setBoardColour} />
      </Scroll>
      <button onClick={handleAddBoard}>add board</button>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBoard);
