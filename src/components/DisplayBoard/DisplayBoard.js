import React from 'react';
import { connect } from 'react-redux';

import './DisplayBoard.css';

// import components
import List from '../List/List';

const mapStateToProps = state => ({
  activeBoard: state.boardInfo.activeBoard,
  boardLists: state.boardContent.boardLists
});

function DisplayBoard({ activeBoard, boardLists }) {
  let boardTitle = activeBoard && activeBoard.title;

  const boardListComponents = boardLists.reduce((acc, list, i) => {
    acc.push(<List key={i} list={list} />);
    return acc;
  }, []);

  return (
    <div>
      <div className="boardTitle">{boardTitle}</div>
      <div className="boardLists">{boardListComponents}</div>
    </div>
  );
}

export default connect(mapStateToProps)(DisplayBoard);
