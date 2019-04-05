import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import './userForm.css';

// import actions
import { userLogin, setIncorrectLogin } from '../../actions/userInfoActions';

const mapStateToProps = state => {
  return {
    username: state.userInfo.username,
    incorrectLogin: state.userInfo.incorrectLogin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (username, password) => userLogin(username, password)(dispatch),
    setIncorrectLogin: bool => dispatch(setIncorrectLogin(bool))
  };
};

function LoginForm({ userLogin, username, incorrectLogin, setIncorrectLogin }) {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleLogin = event => {
    event.preventDefault();
    userLogin(usernameValue, passwordValue);
  };

  const closeLoginMenu = () => {
    setIncorrectLogin(false);
  };

  const incorrectInputAlert = () => {
    if (incorrectLogin) {
      return (
        <Alert
          className="userFormAlert"
          dismissible
          variant="warning"
          onClose={closeLoginMenu}
        >
          <Alert.Heading className="userFormAlertHeading">
            Incorrect username or password
          </Alert.Heading>
        </Alert>
      );
    } else {
      return (
        <div>
          {renderRedirect()}
          <form className="userForm">
            <h1 className="userFormTitle">Login</h1>

            <div className="userFormInputGroup">
              <h4 className="userFormLabel">Username</h4>
              <input
                value={usernameValue}
                className="userFormInput"
                placeholder="username"
                onChange={event => handleValueChange(event, setUsernameValue)}
                autoComplete="username"
              />
            </div>

            <div className="userFormInputGroup">
              <h4 className="userFormLabel">Password</h4>
              <input
                value={passwordValue}
                className="userFormInput"
                placeholder="password"
                type="password"
                onChange={event => handleValueChange(event, setPasswordValue)}
                autoComplete="current-password"
              />
            </div>
            <Button
              onClick={event => handleLogin(event)}
              variant="primary"
              type="submit"
              className="userFormButton"
            >
              Submit
            </Button>
          </form>
        </div>
      );
    }
  };

  const handleValueChange = (event, setValue) => {
    setValue(event.target.value);
  };

  const renderRedirect = () => {
    if (username) {
      return <Redirect to={`/${username}/boards`} />;
    }
  };

  return incorrectInputAlert();
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
