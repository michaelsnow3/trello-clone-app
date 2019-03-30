import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownButton, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import './menus.css';

// import actions
import { getUserBoards } from '../../actions/userInfoActions';

import {postFetch} from '../../fetchRequests'

const mapStateToProps = state => {
  return {
    activeBoard: state.boardInfo.activeBoard,
    username: state.userInfo.username,
    userId: state.userInfo.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserBoards: userId => getUserBoards(userId)(dispatch)
  };
};

const BoardMenu = ({ activeBoard, username, userId, getUserBoards }) => {
  let [redirect, setRedirect] = useState(false);
  let [veryfyAlert, setVerifyAlert] = useState(false);

  const handleBoardEdit = () => {
    console.log('edit');
  };

  const handleAlertClose = () => {
    setVerifyAlert(false);
  };

  // display alert message or button
  const deleteVerification = () => {
    if (veryfyAlert) {
      return (
        <div className="boardAlertContainer">
          <Alert dismissible variant="danger" onClose={handleAlertClose}>
            <Alert.Heading>Delete Board?</Alert.Heading>
            <div className='alertOptions'>
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
    }
    else {
      return (
      <div className="boardMenuContainer">
        <DropdownButton id="dropdown-basic-button" title="Settings">
          <Dropdown.Item onClick={handleBoardEdit}>Edit Title</Dropdown.Item>
          <Dropdown.Item onClick={() => setVerifyAlert(true)}>
            Delete Board
          </Dropdown.Item>
        </DropdownButton>
      </div>
      )
    }
  };

  const handleBoardDelete = () => {
    let boardId = activeBoard.id;
      postFetch('/board/del/', {boardId})
      .then(() => {
        getUserBoards(userId);
      })
      .then(() => {
        setRedirect(true);
      })
      .catch(error => console.log('error deleting board', error));
  };

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={`/${username}/boards`} />;
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
