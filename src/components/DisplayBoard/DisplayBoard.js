import React from 'react';
import { connect } from 'react-redux';

import './DisplayBoard.css';

// import components
import List from '../List/List';
import AddList from '../AddList/AddList';
import SettingsMenu from '../componentSettings/SettingsMenu';

// import actions
import { toggleSettingsMenu } from '../../actions/activeBoardActions';

const mapStateToProps = state => ({
  activeBoard: state.boardInfo.activeBoard,
  boardLists: state.boardContent.boardLists,
  showMenu: state.settingsMenu.showMenu
});

const mapDispatchToProps = dispatch => {
  return {
    toggleSettingsMenu: () => dispatch(toggleSettingsMenu())
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

  boardListComponents.push(<AddList boardId={boardId} key={-1} />);

  return (
    <div>
      <div className="boardHeader">
        <div className="boardTitle">{boardTitle}</div>
        <div onClick={toggleSettingsMenu}>toggle menu!!!!!!!!!!</div>
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
