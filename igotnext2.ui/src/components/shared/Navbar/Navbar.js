import React from 'react';
import './Navbar.scss';

class Navbar extends React.Component {
  render() {
    return (
        <div className="Navbar">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">I Got Next 2.0</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/teams">Teams</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/currentgame">Current Game</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/availableplayers">Available Players</a>
                </li>
                </ul>
            </div>
            </nav>
        </div>
    );
  }
}

export default Navbar;
