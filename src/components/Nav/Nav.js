import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Nav.css';

// import components
import LoginForm from '../Forms/Login';
import ListBoards from '../ListBoards/ListBoards';
import DisplayBoard from '../DisplayBoard/DisplayBoard';
import Home from '../Home/Home';
import Register from '../Forms/Register';
import Logout from '../Logout/Logout';

const mapStateToProps = state => {
  return {
    username: state.userInfo.username
  };
};

function Nav({ username, cookies }) {
  const navbarComponent = () => {
    if (username) {
      // logged in
      return (
        <div className="loggedIn">
          <Link to={`/${username}/boards`}>Boards</Link>
          <Link to="/logout">Logout</Link>
        </div>
      );
    } else {
      // logged out
      return (
        <div>
          <Link to="/login/">Login</Link>
          <Link to="/register/">Register</Link>
        </div>
      );
    }
  };
  return (
    <Router>
      <div className="navPages">
        <nav className="navbar">{navbarComponent()}</nav>

        <Route
          path={`/${username}/boards`}
          render={() => <ListBoards cookies={cookies} />}
        />
        <Route path="/login/" component={LoginForm} />
        <Route path="/logout" component={Logout} />
        <Route path="/register/" component={Register} />
        <Route path="/board/" component={DisplayBoard} />
        <Route path="/" exact render={() => <Home cookies={cookies} />} />
      </div>
    </Router>
  );
}

export default connect(mapStateToProps)(Nav);
