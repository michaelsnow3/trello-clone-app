import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';

import './Login.css';

import { postFetch } from '../../fetchRequests';

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
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const verifyLogin = () => {
    let body = {
      username: usernameValue,
      password: passwordValue
    };
    postFetch('/user/login/', body)
      .then(data => data.json())
      .then(userInfo => {
        if (userInfo) {
          console.log(userInfo);
          // input correct
          // setUserInfo(() => getUserBoards(userId))
        } else {
          // input incorrect
          return setShowAlert(true);
        }
      });
  };

  const loginForm = (
    <div className="loginForm">
      <h1 className="loginFromTitle">Login</h1>

      <div className="loginInputGroup">
        <h4 className="loginFormLabel">Username</h4>
        <input
          value={usernameValue}
          className="loginFormInput"
          placeholder="username"
          onChange={event => handleValueChange(event, setUsernameValue)}
        />
      </div>

      <div className="loginInputGroup">
        <h4 className="loginFormLabel">Password</h4>
        <input
          value={passwordValue}
          className="loginFormInput"
          placeholder="password"
          type="password"
          onChange={event => handleValueChange(event, setPasswordValue)}
        />
      </div>
      <Button
        onClick={verifyLogin}
        variant="primary"
        type="submit"
        className="loginFormButton"
      >
        Submit
      </Button>
    </div>
  );

  const incorrectInputAlert = () => {
    if (showAlert) {
      return (
        <Alert
          className="loginAlert"
          dismissible
          variant="warning"
          onClose={() => setShowAlert(false)}
        >
          <Alert.Heading className='loginAlertHeading'>Incorrect username or password</Alert.Heading>
        </Alert>
      );
    } else {
      return loginForm;
    }
  };

  const handleValueChange = (event, setValue) => {
    setValue(event.target.value);
  };

  return <div>{incorrectInputAlert()}</div>;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
