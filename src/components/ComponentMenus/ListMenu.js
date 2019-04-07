import React, { useState } from 'react';
import { connect } from 'react-redux';

import './menus.css';

import { postFetch } from '../../fetchRequests';

// import actions
import { setBoardContent } from '../../actions/boardActions';
import { toggleSettingsMenu } from '../../actions/boardActions';

// import constants
import { EDIT_LIST_TITLE } from '../../constants/editOptionConstants';

// import components
import EditList from '../EditList/EditList';
import Alert from './Alert';

const mapStateToProps = state => {
  return {
    activeBoard: state.activeBoard.board,
    listId: state.settingsMenu.targetId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBoardContent: boardId => setBoardContent(boardId)(dispatch),
    toggleSettingsMenu: () => dispatch(toggleSettingsMenu('', null))
  };
};

const ListMenu = ({
  listId,
  activeBoard,
  setBoardContent,
  toggleSettingsMenu,
  showAlert,
  setShowAlert
}) => {
  let boardId = activeBoard.id;
  let [showInput, setShowInput] = useState('');

  const handleListDelete = () => {
    let body = {
      listId
    };
    postFetch('/list/del/', body)
      .then(() => {
        setBoardContent(boardId);
      })
      .then(() => {
        toggleShowAlert();
        toggleSettingsMenu();
      })
      .catch(error => console.log('error deleting list', error));
  };

  const toggleShowAlert = () => {
    setShowAlert(!showAlert);
  };

  const editListTitleOption = () => {
    if (showInput === EDIT_LIST_TITLE) {
      return <EditList boardId={boardId} listId={listId} />;
    }
    return (
      <div
        onClick={() => setShowInput(EDIT_LIST_TITLE)}
        className="settingsOption"
      >
        Edit List Title
      </div>
    );
  };

  const alertMessage = 'Delete List?';

  const showAlertComponent = () => {
    if (showAlert) {
      return (
        <Alert
          message={alertMessage}
          confirmCallback={handleListDelete}
          denyCallback={toggleShowAlert}
        />
      );
    } else {
      return (
        <div>
          <div className="settingsOption" onClick={() => toggleShowAlert(true)}>
            Delete List
          </div>
          {editListTitleOption()}
        </div>
      );
    }
  };

  return <div>{showAlertComponent()}</div>;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListMenu);
