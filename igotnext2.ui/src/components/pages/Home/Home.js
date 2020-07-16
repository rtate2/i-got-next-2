import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

class Home extends React.Component {
  render() {
    return (
        <div className="Home">
            <h1>I Got Next 2.0</h1>
            <Link className="btn btn-primary" to="/teams/new">Create a Team</Link>
            <Link className="btn btn-secondary" to="/teams">Join a Team</Link>
            <Link className="adminLink" to="/adminportal">Admin Portal</Link>
        </div>
    );
  }
}

export default Home;
