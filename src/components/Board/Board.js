import React from 'react';
import './Board.css';
import { Route } from 'react-router-dom'

function Board({ board }) {
  const boardTitle = board.title;
  const boardClass = board.favourite
    ? 'boardContainer favourite'
    : 'boardContainer'; 

  return (
    <Route render={({ history }) => (
      <div className={boardClass} onClick={() => { history.push('/board') }}>
        {boardTitle}
      </div>
    )} />
  );
}

export default Board;
