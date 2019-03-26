import React from 'react';
import { connect } from 'react-redux';

import './AddBoard.css';

// import actions
import { handleBoardTitleChange } from '../../actions/addBoardActions';

const mapStateToProps = state => {
  return {
    boardTitleValue: state.handleBoardTitleChange.value
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleBoardTitleChange: value => dispatch(handleBoardTitleChange(value))
  };
};

const AddBoard = ({ boardTitleValue, handleBoardTitleChange }) => {
  const handleAddBoard = () => {
    console.log('add board click');
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
