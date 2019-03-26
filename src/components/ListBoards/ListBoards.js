import React from 'react';
import { connect } from 'react-redux';

import './ListBoards.css';

// import components
import Board from '../Board/Board';
import AddBoard from '../AddBoard/AddBoard';

const mapStateToProps = state => {
  return {
    boards: state.userInfo.boards
  };
};

function Login({ boards }) {
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

export default connect(mapStateToProps)(Login);
