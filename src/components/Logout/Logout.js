import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// import actions
import { userLogout } from '../../actions/userInfoActions';

const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch(userLogout())
  };
};

const Logout = ({ userLogout }) => {
  userLogout();
  localStorage.removeItem('jwt');
  return <Redirect to={`/login/`} />;
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
