import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
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
  toggleSettingsMenu
}) => {
  let boardId = activeBoard.id;
  let [showAlert, setShowAlert] = useState(false);
  let [showInput, setShowInput] = useState('');

  const handleDeleteList = () => {
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

  const showAlertComponent = () => {
    if (showAlert) {
      return (
        <Alert
          className="listAlert"
          dismissible
          variant="danger"
          onClose={toggleShowAlert}
        >
          <Alert.Heading className="alertHeaderText">
            Delete List?
          </Alert.Heading>
          <div className="alertOptions">
            <div onClick={handleDeleteList} className="alertText">
              Yes
            </div>
            <div onClick={toggleShowAlert} className="alertText">
              No
            </div>
          </div>
        </Alert>
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
