import React from 'react';
import { connect } from 'react-redux';
import { setUserInfo } from '../../actions';

const mapStateToProps = (state) => {
  return {
    userInfo: state.setUserInfo.userInfo,
    isPending: state.setUserInfo.isPending
  }
}

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from redecers.
const mapDispatchToProps = (dispatch) => {
  return {
    setUserInfo: () => dispatch(setUserInfo())
  }
}

function Login({ userInfo, setUserInfo }) {

  // login post request
  const onLogin = () => {
    setUserInfo()
  }

  let username = userInfo && userInfo.username

  return(
    <div>
      <h1>Login</h1>
      <button onClick={onLogin}>Login</button>
      <h1>{username}</h1>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

