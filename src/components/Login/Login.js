import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import './Login.css';

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
    <div className="loginForm">
      <h1 className='loginFromTitle'>Login</h1>

      <div className='loginInputGroup'>
        <h4 className="loginFormLabel">Username</h4>
        <input className="loginFormInput" placeholder='username' />
      </div>

      <div className='loginInputGroup'>
        <h4 className="loginFormLabel">Password</h4>
        <input className="loginFormInput" placeholder='password' />
      </div>
      <Button variant="primary" type="submit" className='loginFormButton'>
        Submit
      </Button>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
