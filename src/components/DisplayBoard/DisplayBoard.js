import React from 'react';
import { connect } from 'react-redux';

import './DisplayBoard.css';

// import components
import List from '../List/List';
import AddList from '../AddList/AddList';
import BoardMenu from '../dropdownMenu/BoardMenu'


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

  boardListComponents.push(<AddList boardId={boardId} key={-1}/>)

  return (
    <div>
      <div className="boardHeader">
        <div className="boardTitle">{boardTitle}</div>
        <BoardMenu />
      </div>
      <div className="boardLists">{boardListComponents}</div>
    </div>
  );
}

export default connect(mapStateToProps)(DisplayBoard);
