import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import './menus.css';

// import actions
import { getUserBoards } from '../../actions/userInfoActions';
import { toggleSettingsMenu } from '../../actions/activeBoardActions';

import { postFetch } from '../../fetchRequests';

const mapStateToProps = state => {
  return {
    activeBoard: state.boardInfo.activeBoard,
    username: state.userInfo.username,
    userId: state.userInfo.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserBoards: userId => getUserBoards(userId)(dispatch),
    toggleSettingsMenu: () => dispatch(toggleSettingsMenu('', null))
  };
};

const BoardMenu = ({
  activeBoard,
  username,
  userId,
  getUserBoards,
  toggleSettingsMenu
}) => {
  let [redirect, setRedirect] = useState(false);
  let [showAlert, setShowAlert] = useState(false);

  const handleBoardEdit = () => {
    console.log('edit');
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleBoardDelete = () => {
    let boardId = activeBoard.id;
    postFetch('/board/del/', { boardId })
      .then(() => {
        getUserBoards(userId);
      })
      .then(() => {
        setRedirect(true);
      })
      .then(() => {
        toggleSettingsMenu()
      })
      .catch(error => console.log('error deleting board', error));
  };

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={`/${username}/boards`} />;
    }
  };

  // display alert message or button
  const deleteVerification = () => {
    if (showAlert) {
      return (
        <div className="boardAlertContainer">
          <Alert dismissible variant="danger" onClose={handleAlertClose}>
            <Alert.Heading>Delete Board?</Alert.Heading>
            <div className="alertOptions">
              <div onClick={handleBoardDelete} className="alertText">
                Yes
              </div>
              <div onClick={handleAlertClose} className="alertText">
                No
              </div>
            </div>
          </Alert>
        </div>
      );
    } else {
      return (
        <div>
          <div className="settingsOption" onClick={() => setShowAlert(true)}>
            delete board
          </div>
          <div className="settingsOption" onClick={handleBoardEdit}>
            edit board title
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      {deleteVerification()}
      {renderRedirect()}
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardMenu);
