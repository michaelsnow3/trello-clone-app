import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './nav.css'

// import components
import Login from '../login/login';

function Index() {
  return <h2>Home</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function Nav() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/login/">login</Link>
          <Link to="/users/">Users</Link>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/login/" component={Login} />
        <Route path="/users/" component={Users} />
      </div>
    </Router>
  );
}

export default Nav;
