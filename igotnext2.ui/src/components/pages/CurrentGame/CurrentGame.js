import React from 'react';
import './CurrentGame.scss';
import { Link } from 'react-router-dom';
import teamData from '../../../helpers/data/teamData';
import GameTeams from '../../shared/GameTeams/GameTeams';

class CurrentGame extends React.Component {
  state = {
    currentTeams: [],
    nextTeam: {},
    authStatus: false,
  }

  componentDidMount() {
    this.getCurrentGames();
    this.getNextTeam();
    this.setState({ authStatus: sessionStorage.getItem('adminId') != null });
  }

  getCurrentGames() {
    teamData.getCurrentGames()
      .then((currentTeams) => this.setState({ currentTeams }))
      .catch((error) => console.error(error, 'error from get current games'));
  }

  getNextTeam() {
    teamData.getTeamUpNext()
      .then((nextTeam) => this.setState({ nextTeam }))
      .catch((error) => console.error(error, 'error from get next team'));
  }

  render() {
    const { currentTeams, nextTeam, authStatus } = this.state;

    return (
        <div className="container-fluid CurrentGame text-center">
            <h1 className="Heading">Current Game</h1>
            <div className="CurrentGameTeams">
              <p className="Court">Court 1</p>
              {currentTeams.map((team) => <GameTeams key={team.teamId} team={team} />)}
              { authStatus && <Link to={'/currentgame/edit'}>Edit</Link> }
            </div>
            <div className="UpNext">
              <h2 className="Heading">Up Next...</h2>
              <div className="UpNextTeam">
                <p className="Court">Court 1</p>
                <h3 className="nextTeam"><b>{nextTeam.teamName}</b></h3>
              </div>
            </div>
        </div>
    );
  }
}

export default CurrentGame;
