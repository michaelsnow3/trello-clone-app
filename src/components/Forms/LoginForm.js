import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';

import './userForm.css';

import { postFetch } from '../../fetchRequests';

// import actions
import { getUserInfo } from '../../actions/userInfoActions';
import { getUserBoards } from '../../actions/userInfoActions';

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: getUserBoards => getUserInfo(getUserBoards)(dispatch),
    getUserBoards: userId => getUserBoards(userId)(dispatch)
  };
};

function LoginForm({ getUserInfo, getUserBoards }) {
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
          />
        </div>
        <Button
          onClick={verifyLogin}
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
