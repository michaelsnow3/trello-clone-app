import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import './userForm.css';

import { postFetch } from '../../fetchRequests';

// import actions
import { setUserInfo } from '../../actions/userInfoActions';
import { getUserBoards } from '../../actions/userInfoActions';

const mapStateToProps = state => {
  return {
    username: state.userInfo.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: (userId, username) => dispatch(setUserInfo(userId, username)),
    getUserBoards: userId => getUserBoards(userId)(dispatch)
  };
};

function Register({ setUserInfo, username }) {
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
        localStorage.setItem('jwt', userInfo.token);
        setUserInfo(userInfo.userId, userInfo.username);
      });
  };

  const renderRedirect = () => {
    if (username) {
      return <Redirect to={`/${username}/boards`} />;
    }
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

  return (
    <div>
      {renderRedirect()}
      {incorrectInputAlert()}
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
