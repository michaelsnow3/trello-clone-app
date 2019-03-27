import React from 'react';
import { connect } from 'react-redux';

// import actions
import { setUserInfo } from '../../actions/userInfoActions';
import { getUserBoards } from '../../actions/userInfoActions';

const mapStateToProps = state => {
  return {
    username: state.userInfo.username,
    isPending: state.userInfo.isPending
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: getUserBoards => setUserInfo(getUserBoards)(dispatch),
    getUserBoards: userId => getUserBoards(userId)(dispatch)  
  };
};

function Login({ username, setUserInfo, getUserBoards }) {
  const handleLogin = () => {
    setUserInfo(getUserBoards);
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
      <h1>{username}</h1>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
