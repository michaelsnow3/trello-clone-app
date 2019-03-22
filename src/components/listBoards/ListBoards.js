import React from 'react';
import { connect } from 'react-redux';
import Board from '../board/Board'
// import { setUserInfo } from '../../actions/userInfoActions';

const mapStateToProps = state => {
  return {
    boards: state.userInfo.boards
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

function Login({ boards }) {

  let userBoards = boards.reduce((acc, board, i) => {
    acc.push(<Board board={board} key={i} />)
    return acc
  }, [])
  return (
    <div>
      {userBoards}
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
