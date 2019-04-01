import React, { useState } from 'react';
import { connect } from 'react-redux';

import './EditList.css';

import { postFetch } from '../../fetchRequests';

// import actions
import { toggleSettingsMenu } from '../../actions/activeBoardActions';
import { setBoardContent } from '../../actions/boardContentActions';

const mapStateToProps = state => {
  return {
    listId: state.settingsMenu.targetId,
    activeBoard: state.boardInfo.activeBoard
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSettingsMenu: () => dispatch(toggleSettingsMenu(null, null)),
    setBoardContent: boardId => setBoardContent(boardId)(dispatch)
  };
};

const EditList = ({
  listId,
  activeBoard,
  toggleSettingsMenu,
  setBoardContent
}) => {
  let [listTitleValue, setListTitleValue] = useState('');

  let boardId = activeBoard.id;

  const handleEditListTitle = () => {
    let body = { listId, title: listTitleValue };
    postFetch('/list/edit/title', body)
      .then(() => setListTitleValue(''))
      .then(() => {
        toggleSettingsMenu();
        setBoardContent(boardId);
      });
  };

  const handleInputChange = event => {
    setListTitleValue(event.target.value);
  };
  return (
    <div className="editListContainer">
      <input autoFocus onChange={handleInputChange} value={listTitleValue} />
      <button onClick={handleEditListTitle}>edit title</button>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditList);
