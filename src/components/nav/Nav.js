import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './nav.css';

// import components
import Login from '../login/Login';
import listBoards from '../listBoards/ListBoards';

function Users() {
  return <h2>Users</h2>;
}

function Nav() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/listBoards">Boards</Link>
          <Link to="/login/">login</Link>
          <Link to="/users/">Users</Link>
        </nav>

        <Route path="/listBoards" component={listBoards} />
        <Route path="/login/" component={Login} />
        <Route path="/users/" component={Users} />
      </div>
    </Router>
  );
}

export default Nav;
