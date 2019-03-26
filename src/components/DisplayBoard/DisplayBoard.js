import React from 'react';
import { connect } from 'react-redux';

// import components
import List from '../List/List';

const mapStateToProps = state => ({
  activeBoard: state.boardInfo.activeBoard,
  boardLists: state.boardContent.boardLists
});

function DisplayBoard({ activeBoard, boardLists }) {
  let boardTitle = activeBoard && activeBoard.title;

  const boardListComponents = boardLists.reduce((acc, list, i) => {
    acc.push(<List key={i} list={list} />)
    return acc;
  }, [])

  return (
    <div>
      {boardTitle}
      {boardListComponents}
    </div>)
}

export default connect(mapStateToProps)(DisplayBoard);
