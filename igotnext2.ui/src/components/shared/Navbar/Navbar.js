import React from 'react';
import './Navbar.scss';

class Navbar extends React.Component {
  render() {
    return (
        <div className="Navbar">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/">I Got Next 2.0</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/teams">Teams</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/currentgame">Current Game</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/availableplayers">Available Players</a>
                </li>
                </ul>
            </div>
            </nav>
        </div>
    );
  }
}

export default Navbar;
