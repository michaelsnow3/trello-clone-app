import React from 'react';
import { connect } from 'react-redux';

import './DisplayBoard.css';
import editIcon from '../componentSettings/editIcon.png';

// import components
import List from '../List/List';
import SettingsMenu from '../componentSettings/SettingsMenu';

// import actions
import { toggleSettingsMenu } from '../../actions/activeBoardActions';

// import constants
import { BOARD } from '../../constants/activeBoardConstants';

const mapStateToProps = state => ({
  activeBoard: state.boardInfo.activeBoard,
  boardLists: state.boardContent.boardLists,
  showMenu: state.settingsMenu.showMenu
});

const mapDispatchToProps = dispatch => {
  return {
    toggleSettingsMenu: menuType => dispatch(toggleSettingsMenu(menuType))
  };
};

function DisplayBoard({
  activeBoard,
  boardLists,
  showMenu,
  toggleSettingsMenu
}) {
  let boardTitle = activeBoard && activeBoard.title;
  let boardId = activeBoard && activeBoard.id;

  const boardListComponents = boardLists.reduce((acc, list, i) => {
    acc.push(<List key={i} list={list} boardId={boardId} />);
    return acc;
  }, []);

  const settingsMenuComponent = () => {
    if (showMenu) {
      return <SettingsMenu />;
    }
  };

  return (
    <div>
      <div className="boardHeader">
        <div className="boardTitle">{boardTitle}</div>
        <img
          onClick={() => toggleSettingsMenu(BOARD, boardId)}
          src={editIcon}
          className="boardEditIcon"
          alt="edit icon"
        />
      </div>
      {settingsMenuComponent()}
      <div className="boardLists">{boardListComponents}</div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayBoard);
