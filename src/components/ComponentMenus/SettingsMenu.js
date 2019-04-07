import React, { useState } from 'react';
import { connect } from 'react-redux';
import { BOARD, LIST, CARD } from '../../constants/settingsMenuConstants';

import './menus.css';
import closeIcon from '../../images/closeIcon.png';

// import components
import BoardMenu from '../ComponentMenus/BoardMenu';
import ListMenu from '../ComponentMenus/ListMenu';
import CardMenu from '../ComponentMenus/CardMenu';

const mapStateToProps = state => {
  return {
    menuType: state.settingsMenu.menuType,
    targetId: state.settingsMenu.targetId
  };
};

const SettingsMenu = ({ menuType, toggleSettingsMenu }) => {
  // set active menu to selected menu type
  let activeMenu = false;
  const [showAlert, setShowAlert] = useState(false);
  const alertStyle = showAlert
    ? { backgroundColor: 'red', color: 'white' }
    : {};

  switch (menuType) {
    case BOARD:
      activeMenu = (
        <BoardMenu showAlert={showAlert} setShowAlert={setShowAlert} />
      );
      break;
    case LIST:
      activeMenu = (
        <ListMenu showAlert={showAlert} setShowAlert={setShowAlert} />
      );
      break;
    case CARD:
      activeMenu = (
        <CardMenu showAlert={showAlert} setShowAlert={setShowAlert} />
      );
      break;
    default:
      activeMenu = false;
      break;
  }

  return (
    <div style={alertStyle} className="settingsMenu">
      <img
        className="closeIcon"
        src={closeIcon}
        alt="close icon"
        onClick={() => toggleSettingsMenu(false)}
      />
      {activeMenu}
    </div>
  );
};

export default connect(
  mapStateToProps,
  null
)(SettingsMenu);
