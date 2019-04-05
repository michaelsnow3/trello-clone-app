import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getFetch } from '../../fetchRequests';

// import actions
import { setUserInfo } from '../../actions/userInfoActions';

const mapStateToProps = state => {
  return {
    redirectPath: state.userInfo.redirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: (userId, username, redirectPath) =>
      dispatch(setUserInfo(userId, username, redirectPath))
  };
};

const Home = ({ setUserInfo, redirectPath }) => {
  useEffect(() => {
    getFetch(`/user/verify/${localStorage.getItem('jwt')}`)
      .then(data => data.json())
      .then(userInfo => {
        setUserInfo(
          userInfo.userId,
          userInfo.username,
          `/${userInfo.username}/boards/`
        );
      })
      .catch(() => {
        setUserInfo(null, null, `/login/`);
      });
  });

  const renderRedirect = path => {
    if (redirectPath) {
      return <Redirect to={redirectPath} />;
    } else {
      return <div>...loading</div>;
    }
  };

  return <div>{renderRedirect()}</div>;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
