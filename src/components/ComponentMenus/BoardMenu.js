import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './menus.css';

// import components
import EditBoard from '../EditBoard/EditBoard';
import Alert from './Alert';

// import actions
import { getUserBoards } from '../../actions/userInfoActions';
import { toggleSettingsMenu } from '../../actions/boardActions';

// import constants
import { EDIT_BOARD_TITLE } from '../../constants/editOptionConstants';

import { postFetch } from '../../fetchRequests';

const mapStateToProps = state => {
  return {
    activeBoard: state.activeBoard.board,
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
  toggleSettingsMenu,
  showAlert,
  setShowAlert
}) => {
  let [redirect, setRedirect] = useState(false);

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

  // display alert message or button
  const alertMessage = 'Delete Board?';

  const handleShowDeleteBoard = () => {
    setShowAlert(true);
  };

  const deleteVerification = () => {
    if (showAlert) {
      return (
        <Alert
          message={alertMessage}
          confirmCallback={handleBoardDelete}
          denyCallback={handleAlertClose}
        />
      );
    } else {
      return (
        <div className="boardMenuContainer">
          <div className="settingsOption" onClick={handleShowDeleteBoard}>
            Delete Board
          </div>
          {editBoardTitleOption}
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
