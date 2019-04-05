import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import './Board.css';
import emptyStarIcon from './emptyStarIcon.png';
import goldStarIcon from './goldStarIcon.png';

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

  const starIcon = board.favourite ? goldStarIcon : emptyStarIcon;

  const handleBoardClick = history => {
    setBoardInfo(board);
    setBoardContent(board.id);
    history.push('/board');
  };
  let parsedTitle = boardTitle.slice(0, 45);

  if (boardTitle.length > 45) {
    parsedTitle += '...';
  }

  return (
    <Route
      render={({ history }) => (
        <div
          className="boardContainer"
          onClick={() => handleBoardClick(history)}
        >
          {parsedTitle}
          <img className="favouriteStar" src={starIcon} alt="favourite star" />
        </div>
      )}
    />
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Board);
