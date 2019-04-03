import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';

import './userForm.css';

// import actions
import { userLogin } from '../../actions/userInfoActions';

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (username, password) => userLogin(username, password)(dispatch)
  };
};

function LoginForm({ userLogin }) {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = event => {
    event.preventDefault();
    userLogin(usernameValue, passwordValue);
  };

  const incorrectInputAlert = () => {
    if (showAlert) {
      return (
        <Alert
          className="userFormAlert"
          dismissible
          variant="warning"
          onClose={() => setShowAlert(false)}
        >
          <Alert.Heading className="userFormAlertHeading">
            Incorrect username or password
          </Alert.Heading>
        </Alert>
      );
    }
  };

  const handleValueChange = (event, setValue) => {
    setValue(event.target.value);
  };

  return (
    <div>
      {incorrectInputAlert()}
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

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
