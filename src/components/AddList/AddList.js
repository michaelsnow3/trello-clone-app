import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import './AddList.css';

// import actions
import { handleListTitleChange } from '../../actions/onValueChangeActions';
import { setBoardContent } from '../../actions/boardActions';

import { postFetch } from '../../fetchRequests';

const mapStateToProps = state => {
  return {
    listTitleValue: state.handleListTitleChange.value,
    boardLists: state.boardContent.boardLists
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleListTitleChange: value => dispatch(handleListTitleChange(value)),
    setBoardContent: boardId => setBoardContent(boardId)(dispatch)
  };
};

const AddList = ({
  listTitleValue,
  handleListTitleChange,
  boardId,
  boardLists,
  setBoardContent
}) => {
  const handleAddList = () => {
    // return if list has no title
    if (!listTitleValue.length) return;

    let body = {
      title: listTitleValue,
      boardId,
      position: boardLists.length
    };

    postFetch('/list/new/', body)
      .then(() => {
        setBoardContent(boardId);
        handleListTitleChange('');
      })
      .catch(error => console.log('error adding user list', error));
  };

  const handleTextChange = event => {
    handleListTitleChange(event.target.value);
  };

  return (
    <div className="addListContainer">
      <div>
        <input
          className="addListInput"
          value={listTitleValue}
          onChange={handleTextChange}
          placeholder="list title"
        />
      </div>
      <Button className="addListButton" onClick={handleAddList}>
        add list
      </Button>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddList);
