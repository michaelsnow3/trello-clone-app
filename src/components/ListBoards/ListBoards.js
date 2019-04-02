import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
  let [redirect, setRedirect] = useState(false);

  // redirect to login if no userId exists
  if (!userId && !redirect) {
    setRedirect(true);
  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={`/login/`} />;
    }
  };

  // return loading until user boards have been fetched
  if (isPending) {
    return <div>Loading...</div>;
  }

  let userBoards = [<AddBoard key={-1} />];

  if (userId && !isPending) {
    boards.forEach((board, i) => {
      userBoards.push(<Board board={board} key={i} />);
    });
  }
  return (
    <div>
      {renderRedirect()}
      <div className="boardListContainer">{userBoards}</div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListBoards);
