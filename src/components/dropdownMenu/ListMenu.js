import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

import './menus.css';
import trashIcon from './trashIcon.png';

const ListMenu = ({ listId }) => {
  let [showAlert, setShowAlert] = useState(false);

  const handleDeleteList = () => {
    console.log('delete list');
  };

  const toggleShowAlert = () => {
    setShowAlert(!showAlert);
  };

  const showAlertComponent = () => {
    if (showAlert) {
      return (
        <Alert className='listAlert' dismissible variant="danger" onClose={toggleShowAlert}>
          <Alert.Heading className='alertHeaderText'>Delete List?</Alert.Heading>
          <div className='alertOptions'>
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
        <img onClick={toggleShowAlert} src={trashIcon} alt="settingsIcon" className="settingsIcon" />
      )
    }
  };

  return (
    <div>
      {showAlertComponent()}
    </div>
  );
};

export default ListMenu;
