import React from 'react';
import { connect } from 'react-redux';

import './AddBoard.css';
import closeIcon from './closeIcon.png';

// import components
import Scroll from '../Scroll/Scroll';
import BoardColourOptions from '../BoardColourOptions/BoardColourOptions';

// import actions
import { handleBoardTitleChange } from '../../actions/onValueChangeActions';
import { getUserBoards } from '../../actions/userInfoActions';
import { setActiveBoardColour } from '../../actions/boardActions';

import { postFetch } from '../../fetchRequests';

const mapStateToProps = state => {
  return {
    boardTitleValue: state.handleBoardTitleChange.value,
    userId: state.userInfo.userId,
    colour: state.activeBoard.colour
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleBoardTitleChange: value => dispatch(handleBoardTitleChange(value)),
    getUserBoards: userId => getUserBoards(userId)(dispatch),
    setActiveBoardColour: colour => dispatch(setActiveBoardColour(colour))
  };
};

const AddBoard = ({
  boardTitleValue,
  handleBoardTitleChange,
  userId,
  colour,
  getUserBoards,
  setActiveBoardColour
}) => {
  const handleAddBoard = () => {
    // return if board has no title
    if (!boardTitleValue.length) return;

    let body = {
      boardTitleValue,
      userId
    };
    postFetch('/board/new/', body)
      .then(data => data.json())
      .then(() => {
        getUserBoards(userId);
        handleBoardTitleChange('');
      })
      .catch(error => console.log('error adding/fetching user boards', error));
  };

  const handleTextChange = event => {
    handleBoardTitleChange(event.target.value);
  };

  return (
    <div className="addBoardContainer" style={{ backgroundColor: colour }}>
      <img className="addBoardCloseIcon" src={closeIcon} alt="close icon" />
      <div className="addBoardHeader">Add Board</div>
      <input
        className="addBoardInput"
        value={boardTitleValue}
        onChange={handleTextChange}
        placeholder="Board Title"
      />
      <div>Background Colour</div>
      <Scroll>
        <BoardColourOptions setActiveBoardColour={setActiveBoardColour} />
      </Scroll>
      <button onClick={handleAddBoard}>add board</button>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBoard);
