import React from 'react';
import { connect } from 'react-redux';
import { setUserInfo } from '../../actions/userInfoActions';

const mapStateToProps = state => {
  return {
    username: state.userInfo.username,
    isPending: state.userInfo.isPending
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: () => dispatch(setUserInfo())
  };
};

function Login({ username, setUserInfo }) {

  const handleLogin = () => {
    setUserInfo();
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
