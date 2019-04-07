import React from 'react';
import { connect } from 'react-redux';
import { BOARD, LIST, CARD } from '../../constants/settingsMenuConstants';

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

const SettingsMenu = ({ menuType }) => {
  // set active menu to selected menu type
  let activeMenu = false;
  switch (menuType) {
    case BOARD:
      activeMenu = <BoardMenu />;
      break;
    case LIST:
      activeMenu = <ListMenu />;
      break;
    case CARD:
      activeMenu = <CardMenu />;
      break;
    default:
      activeMenu = false;
      break;
  }

  return <div className="settingsMenu">{activeMenu}</div>;
};

export default connect(
  mapStateToProps,
  null
)(SettingsMenu);
