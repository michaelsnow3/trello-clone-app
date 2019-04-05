import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import './Board.css';
import emptyStarIcon from './emptyStarIcon.png';
import goldStarIcon from './goldStarIcon.png';

// import actions
import { setBoardInfo, setBoardContent } from '../../actions/boardActions';
import { getUserBoards } from '../../actions/userInfoActions';

import { postFetch } from '../../fetchRequests';

const mapStateToProps = state => {
  return {
    userId: state.userInfo.userId,
    favourite: state.setBoardContent
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBoardInfo: activeBoard => dispatch(setBoardInfo(activeBoard)),
    setBoardContent: boardId => setBoardContent(boardId)(dispatch),
    getUserBoards: userId => dispatch(getUserBoards(userId))
  };
};

const Board = ({
  board,
  userId,
  setBoardInfo,
  setBoardContent,
  getUserBoards
}) => {
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

  const handleFavouriteClick = event => {
    event.stopPropagation();

    const body = { boardId: board.id, favourite: !board.favourite };
    postFetch('/board/favourite/', body).then(() => {
      getUserBoards(userId);
    });
  };

  return (
    <Route
      render={({ history }) => (
        <div
          className="boardContainer"
          onClick={() => handleBoardClick(history)}
        >
          {parsedTitle}
          <img
            onClick={event => handleFavouriteClick(event)}
            className="favouriteStar"
            src={starIcon}
            alt="favourite star"
          />
        </div>
      )}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
