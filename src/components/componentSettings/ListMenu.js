import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

import './menus.css';

import { postFetch } from '../../fetchRequests';

// import actions
import { setBoardContent } from '../../actions/boardContentActions';
import { toggleSettingsMenu } from '../../actions/activeBoardActions';

const mapStateToProps = state => {
  return {
    activeBoard: state.boardInfo.activeBoard,
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
      .catch(error => console.log('error deleting board', error));
  };

  const toggleShowAlert = () => {
    setShowAlert(!showAlert);
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
            delete list
          </div>
          <div className="settingsOption" onClick={console.log('edit')}>
            edit list title
          </div>
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