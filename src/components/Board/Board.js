import React from 'react';
import { connect } from 'react-redux';
import './Board.css';
import { Route } from 'react-router-dom';

// import action
import { setBoardInfo } from '../../actions/activeBoardActions';

const mapDispatchToProps = (dispatch) => {
  return {
    setBoardInfo: (activeBoard) => dispatch(setBoardInfo(activeBoard)),
  }
}

function Board({ board, setBoardInfo }) {
  const boardTitle = board.title;
  const boardClass = board.favourite
    ? 'boardContainer favourite'
    : 'boardContainer';

  const handleBoardClick = history => {
    setBoardInfo(board);
    history.push('/board');
  };

  return (
    <Route
      render={({ history }) => (
        <div className={boardClass} onClick={() => handleBoardClick(history)}>
          {boardTitle}
        </div>
      )}
    />
  );
}

export default connect(null, mapDispatchToProps)(Board);
