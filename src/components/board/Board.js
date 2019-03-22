import React from 'react';
import './Board.css';

function Board({ board }) {
  const boardTitle = board.title;
  const boardClass = board.favourite
    ? 'boardContainer favourite'
    : 'boardContainer';

  const handleBoardClick = () => {
    console.log(boardTitle);
  };
  return (
    <div className={boardClass} onClick={handleBoardClick}>
      {boardTitle}
    </div>
  );
}

export default Board;
