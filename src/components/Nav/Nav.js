import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Nav.css';

// import components
import Login from '../Login/Login';
import ListBoards from '../ListBoards/ListBoards';
import DisplayBoard from '../DisplayBoard/DisplayBoard';

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

        <Route path={`/${username}/boards`} component={ListBoards} />
        <Route path="/login/" component={Login} />
        <Route path="/users/" component={Users} />
        <Route path="/board/" component={DisplayBoard} />
      </div>
    </Router>
  );
}

export default connect(mapStateToProps)(Nav);
