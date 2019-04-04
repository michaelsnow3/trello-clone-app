import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    cookies: ownProps.cookies
  };
};

const mapDispatchToProps = dispatch => {};

const Home = () => {
  return <div>{'cookie'}</div>;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
