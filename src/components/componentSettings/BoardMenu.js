import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import './menus.css';

// import components
import AddList from '../AddList/AddList';
import EditBoard from '../EditBoard/EditBoard';

// import actions
import { getUserBoards } from '../../actions/userInfoActions';
import { toggleSettingsMenu } from '../../actions/activeBoardActions';

// import constants
import {
  ADD_LIST,
  EDIT_BOARD_TITLE
} from '../../constants/editOptionConstants';

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
  let [showInput, setShowInput] = useState('');

  const boardId = activeBoard.id;

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleBoardDelete = () => {
    postFetch('/board/del/', { boardId })
      .then(() => {
        getUserBoards(userId);
      })
      .then(() => {
        setRedirect(true);
      })
      .then(() => {
        toggleSettingsMenu();
      })
      .catch(error => console.log('error deleting board', error));
  };

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={`/${username}/boards`} />;
    }
  };

  const editBoardTitleOption =
    showInput === EDIT_BOARD_TITLE ? (
      <EditBoard boardId={boardId} />
    ) : (
      <div
        onClick={() => setShowInput(EDIT_BOARD_TITLE)}
        className="settingsOption"
      >
        Edit Board Title
      </div>
    );
  const addListOption =
    showInput === ADD_LIST ? (
      <AddList boardId={boardId} className="inputOption" />
    ) : (
      <div
        onClick={() => setShowInput(ADD_LIST)}
        className="settingsOption"
      >
        Add List
      </div>
    );

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
            Delete Board
          </div>
          {editBoardTitleOption}
          {addListOption}
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
