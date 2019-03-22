import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './nav.css';

// import components
import Login from '../login/Login';
import listBoards from '../listBoards/ListBoards';

const mapStateToProps = state => {
  return {
    username: state.userInfo.username
  };
};

function Users() {
  return <h2>Users</h2>;
}

function Nav({ username }) {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to={`/${username}/boards`}>Boards</Link>
          <Link to="/login/">login</Link>
          <Link to="/users/">Users</Link>
        </nav>

        <Route path={`/${username}/boards`} component={listBoards} />
        <Route path="/login/" component={Login} />
        <Route path="/users/" component={Users} />
      </div>
    </Router>
  );
}

export default connect(mapStateToProps)(Nav);
