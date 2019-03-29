import React from 'react';
import { connect } from 'react-redux';

import './DisplayBoard.css';
import settings from '../../settings.png'

// import components
import List from '../List/List';
import AddList from '../AddList/AddList'

const mapStateToProps = state => ({
  activeBoard: state.boardInfo.activeBoard,
  boardLists: state.boardContent.boardLists
});

function DisplayBoard({ activeBoard, boardLists }) {
  let boardTitle = activeBoard && activeBoard.title;
  let boardId = activeBoard && activeBoard.id;

  const boardListComponents = boardLists.reduce((acc, list, i) => {
    acc.push(<List key={i} list={list} boardId={boardId} />);
    return acc;
  }, []);

  const handleSettingsClick = () => {
    console.log('gear clicked')
  }

  boardListComponents.push(<AddList boardId={boardId} key={-1}/>)

  return (
    <div>
      <div className="boardHeader">
        <div className="boardTitle">{boardTitle}</div>
        <img onClick={handleSettingsClick} className="boardSettings" src={settings} alt='gear' />
      </div>
      <div className="boardLists">{boardListComponents}</div>
    </div>
  );
}

export default connect(mapStateToProps)(DisplayBoard);
