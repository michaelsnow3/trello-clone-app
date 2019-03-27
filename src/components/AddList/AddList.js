import React from 'react';
import { connect } from 'react-redux';

import './AddList.css';

// import actions
import { handleListTitleChange } from '../../actions/addListActions';
import { setBoardContent } from '../../actions/boardContentActions';

const mapStateToProps = state => {
  return {
    listTitleValue: state.handleListTitleChange.value
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleListTitleChange: value => dispatch(handleListTitleChange(value)),
    setBoardContent: boardId => setBoardContent(boardId)(dispatch)
  };
};

const AddList = ({ listTitleValue, handleListTitleChange, boardId, setBoardContent }) => {
  const handleAddList = () => {
    // return if list has no title
    if (!listTitleValue.length) return;

    fetch(`http://localhost:8888/list/new/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        listTitleValue,
        boardId
      })
    })
      .then(() => {
        setBoardContent(boardId)
      })
      .catch(error => console.log('error adding user list', error));
  };

  const handleTextChange = event => {
    handleListTitleChange(event.target.value);
  };

  return (
    <div className="addListContainer">
      <input
        className="addListInput"
        value={listTitleValue}
        onChange={handleTextChange}
      />
      <button onClick={handleAddList}>add list</button>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddList);
