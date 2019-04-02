import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './ListBoards.css';

// import components
import Board from '../Board/Board';
import AddBoard from '../AddBoard/AddBoard';

// import actions
import { getUserBoards } from '../../actions/userInfoActions';

const mapStateToProps = state => {
  return {
    boards: state.getUserBoards.boards,
    isPending: state.getUserBoards.isPending,
    userId: state.userInfo.userId
  };
};

const mapDispatchToProps = dispatch => {
  return { getUserBoards: userId => getUserBoards(userId)(dispatch) };
};

function ListBoards({ boards, getUserBoards, userId, isPending }) {
  // return loading until user boards have been fetched
  if (isPending) {
    return <div>Loading...</div>;
  }

  let userBoards = boards.reduce((acc, board, i) => {
    // add add board card to the front of the array
    if (i === 0) acc.push(<AddBoard key={-1} />);

    acc.push(<Board board={board} key={i} />);
    return acc;
  }, []);
  return (
    <div>
      <div className="boardListContainer">{userBoards}</div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListBoards);
