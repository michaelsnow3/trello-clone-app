import React from 'react';
import { connect } from 'react-redux';
import { BOARD, LIST, CARD } from '../../constants/activeBoardConstants';

// import components
import BoardMenu from '../componentSettings/BoardMenu';
import ListMenu from '../componentSettings/ListMenu';

// import actions
import { toggleSettingsMenu } from '../../actions/activeBoardActions';

const mapStateToProps = state => {
  return {
    menuType: state.settingsMenu.menuType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSettingsMenu: () => dispatch(toggleSettingsMenu())
  };
};

const SettingsMenu = ({ menuType, toggleSettingsMenu }) => {
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
      activeMenu = <BoardMenu />;
      break;
    default:
      activeMenu = false;
      break;
  }
  return (
    <div className="settingsMenu">
      {activeMenu}
      <div className="settingsClose" onClick={() => toggleSettingsMenu(false)}>
        close
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsMenu);
