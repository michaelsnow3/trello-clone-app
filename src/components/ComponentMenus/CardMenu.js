import React, { useState } from 'react';
import { connect } from 'react-redux';

import './menus.css';

import { postFetch } from '../../fetchRequests';

// import actions
import { setBoardContent } from '../../actions/boardActions';
import { toggleSettingsMenu } from '../../actions/boardActions';

// import components
import EditCard from '../EditCard/EditCard';
import Alert from './Alert';

const mapStateToProps = state => {
  return {
    activeBoard: state.activeBoard.board,
    cardId: state.settingsMenu.targetId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBoardContent: boardId => setBoardContent(boardId)(dispatch),
    toggleSettingsMenu: () => dispatch(toggleSettingsMenu('', null))
  };
};

const CardMenu = ({
  cardId,
  activeBoard,
  setBoardContent,
  toggleSettingsMenu,
  setShowAlert,
  showAlert
}) => {
  let boardId = activeBoard.id;
  let [showInput, setShowInput] = useState(false);

  const handleCardDelete = () => {
    let body = {
      cardId
    };
    postFetch('/card/del/', body)
      .then(() => {
        setBoardContent(boardId);
      })
      .then(() => {
        toggleShowAlert();
        toggleSettingsMenu();
      })
      .catch(error => console.log('error deleting card', error));
  };

  const toggleShowAlert = () => {
    setShowAlert(!showAlert);
  };

  const editCardTitleOption = () => {
    if (showInput) {
      return <EditCard boardId={boardId} cardId={cardId} />;
    }
    return (
      <div className="settingsOption" onClick={() => setShowInput(true)}>
        edit card title
      </div>
    );
  };

  const alertMessage = 'Delete Card?';
  const showAlertComponent = () => {
    if (showAlert) {
      return (
        <Alert
          message={alertMessage}
          confirmCallback={handleCardDelete}
          denyCallback={toggleShowAlert}
        />
      );
    } else {
      return (
        <div>
          <div className="settingsOption" onClick={() => toggleShowAlert(true)}>
            delete card
          </div>
          {editCardTitleOption()}
        </div>
      );
    }
  };

  return <div>{showAlertComponent()}</div>;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardMenu);
