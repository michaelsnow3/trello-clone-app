import React from 'react';
import './Board.css'

function Board({ board }) {
  let boardTitle = board.title
  return(
    <div className='container'>
      {boardTitle}
    </div>
  )
}

export default Board