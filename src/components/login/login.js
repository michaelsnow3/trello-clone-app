import React from 'react';

function Login() {

  // login post request
  const onLogin = () => {
    console.log('button clicked')
    fetch('http://localhost:8888/user/login', {
      method: 'POST',
      body: {
        username: 'mike',
        passwordHash: 'asdf'
      },
      headers:{
        'Content-Type': 'application/json'
      }
    })
  }

  return(
    <div>
      <h1>Login</h1>
      <button onClick={onLogin}>Login</button>
    </div>
  );
}

export default Login