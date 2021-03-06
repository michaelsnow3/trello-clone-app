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
    let userToken = localStorage.getItem('jwt');

    if (!userToken || userToken === 'undefined') {
      setUserInfo(null, null, `/login/`);
      return;
    }

    getFetch(`/user/verify/${userToken}`)
      .then(data => data.json())
      .then(userInfo => {
        if (userInfo) {
          setUserInfo(
            userInfo.userId,
            userInfo.username,
            `/${userInfo.username}/boards/`
          );
        }
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
