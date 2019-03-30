import React from 'react';
import { connect } from 'react-redux';

import './AddList.css';

// import actions
import { handleListTitleChange } from '../../actions/onValueChangeActions';
import { setBoardContent } from '../../actions/boardContentActions';

import { postFetch } from '../../fetchRequests'

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

    let body = {
      listTitleValue,
      boardId
    }

    postFetch('/list/new/', body)
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
    <div className="addListInput">
      <input
        value={listTitleValue}
        onChange={handleTextChange}
      />
      </div>
      <button onClick={handleAddList}>add list</button>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddList);
