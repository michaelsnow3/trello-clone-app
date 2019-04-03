import React from 'react';
import { connect } from 'react-redux';
import './Board.css';
import { Route } from 'react-router-dom';

// import actions
import { setBoardInfo } from '../../actions/activeBoardActions';
import { setBoardContent } from '../../actions/boardContentActions';

const mapDispatchToProps = dispatch => {
  return {
    setBoardInfo: activeBoard => dispatch(setBoardInfo(activeBoard)),
    setBoardContent: boardId => setBoardContent(boardId)(dispatch)
  };
};

const Board = ({ board, setBoardInfo, setBoardContent }) => {
  const boardTitle = board.title;
  const boardClass = board.favourite
    ? 'boardContainer favourite'
    : 'boardContainer';

  const handleBoardClick = history => {
    setBoardInfo(board);
    setBoardContent(board.id);
    history.push('/board');
  };

  let parsedTitle = boardTitle.slice(0, 55)
  if (boardTitle.length > 55) {
    parsedTitle += '...'
  }

  return (
    <Route
      render={({ history }) => (
        <div className={boardClass} onClick={() => handleBoardClick(history)}>
          {parsedTitle}
        </div>
      )}
    />
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Board);
