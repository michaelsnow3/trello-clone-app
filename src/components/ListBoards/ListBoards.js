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
  useEffect(() => {
    getUserBoards(userId);
  }, [userId, getUserBoards]);

  // return loading until user boards have been fetched
  if (isPending) {
    return <div>Loading...</div>;
  }

  let userBoards = [<AddBoard key={-1} />];

  boards.forEach((board, i) => {
    userBoards.push(<Board board={board} key={i} />);
  });
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
