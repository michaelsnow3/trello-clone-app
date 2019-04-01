import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Home = () => {
  const [redirectPath, setRedirectPath] = useState('/login/');
  const renderRedirect = () => {
    if (redirectPath) {
      return <Redirect to={redirectPath} />;
    }
  };

  return renderRedirect();
};

export default Home;
