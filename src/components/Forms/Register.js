import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';

import './userForm.css';

import { postFetch } from '../../fetchRequests';

// import actions
import { setUserInfo } from '../../actions/userInfoActions';
import { getUserBoards } from '../../actions/userInfoActions';

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: getUserBoards => setUserInfo(getUserBoards)(dispatch),
    getUserBoards: userId => getUserBoards(userId)(dispatch)
  };
};

function Register({ setUserInfo, getUserBoards }) {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleRegister = event => {
    event.preventDefault();

    if (!usernameValue.length || !passwordValue.length) {
      setShowAlert('Empty Input Field');
      return;
    }
    let body = {
      username: usernameValue,
      password: passwordValue
    };
    postFetch('/user/register/', body)
      .then(data => data.json())
      .then(userInfo => {
        if (userInfo.error) {
          setShowAlert('Username Exists');
          return;
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
            {showAlert}
          </Alert.Heading>
        </Alert>
      );
    } else {
      return (
        <form className="userForm">
          <h1 className="userFormTitle">Register</h1>

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
            onClick={event => handleRegister(event)}
            variant="primary"
            type="submit"
            className="userFormButton"
          >
            Submit
          </Button>
        </form>
      );
    }
  };

  const handleValueChange = (event, setValue) => {
    setValue(event.target.value);
  };

  return <div>{incorrectInputAlert()}</div>;
}

export default connect(
  null,
  mapDispatchToProps
)(Register);
