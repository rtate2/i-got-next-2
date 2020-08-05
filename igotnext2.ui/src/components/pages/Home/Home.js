import React from 'react';
import { Link } from 'react-router-dom';
// import { BasketballPic } from '../../../images';
import image from '../../../images/basketballPlayer.png';
import './Home.scss';

class Home extends React.Component {
  render() {
    return (
        <div className="container-fluid Home text-center">
            <h1><b>I Got Next 2.0</b></h1>
            <div className="Home2">
              <div className="createTeamButton">
                <Link className="btn btn-primary btn-lg ctButton" to="/teams/new">Create a Team</Link>
              </div>
              <div className="joinTeamButton">
                <Link className="btn btn-warning btn-lg jtButton" to="/teams">Join a Team</Link>
              </div>
              <div>
                <img src={image} className="img-fluid homeImage" alt="basketball player sillouettes making moves"></img>
              </div>
              <Link className="adminLink" to="/adminportal">Admin Portal</Link>
            </div>
        </div>
    );
  }
}

export default Home;
