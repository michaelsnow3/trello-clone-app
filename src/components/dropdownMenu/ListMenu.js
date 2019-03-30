import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

import './menus.css';
import trashIcon from './trashIcon.png';

import { postFetch } from '../../fetchRequests';

// import actions
import { setBoardContent } from '../../actions/boardContentActions';

const mapDispatchToProps = dispatch => {
  return {
    setBoardContent: boardId => setBoardContent(boardId)(dispatch)
  };
};

const ListMenu = ({ listId, boardId, setBoardContent }) => {
  let [showAlert, setShowAlert] = useState(false);

  const handleDeleteList = () => {
    let body = {
      listId
    };
    postFetch('/list/del/', body)
      .then(() => {
        setBoardContent(boardId);
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
        <img
          onClick={toggleShowAlert}
          src={trashIcon}
          alt="settingsIcon"
          className="settingsIcon"
        />
      );
    }
  };

  return <div>{showAlertComponent()}</div>;
};

export default connect(
  null,
  mapDispatchToProps
)(ListMenu);
