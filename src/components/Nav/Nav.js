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

function Nav({ username }) {
  return (
    <Router>
      <div className="navPages">
        <nav className="navbar">
          <div>
            <Link to={`/${username}/boards`}>Boards</Link>
            <Link to="/login/">Login</Link>
            <Link to="/register/">Register</Link>
          </div>
          <div>
            <Link to="/logout">Logout</Link>
          </div>
        </nav>

        <Route path={`/${username}/boards`} component={ListBoards} />
        <Route path="/login/" component={LoginForm} />
        <Route path="/logout" component={Logout} />
        <Route path="/register/" component={Register} />
        <Route path="/board/" component={DisplayBoard} />
        <Route path="/" exact component={Home} />
      </div>
    </Router>
  );
}

export default connect(mapStateToProps)(Nav);
