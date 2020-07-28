import React from 'react';
import './CurrentGame.scss';
import teamData from '../../../helpers/data/teamData';
import GameTeams from '../../shared/GameTeams/GameTeams';

class CurrentGame extends React.Component {
  state = {
    currentTeams: [],
    nextTeam: {},
  }

  componentDidMount() {
    this.getCurrentGames();
    this.getNextTeam();
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
    const { currentTeams, nextTeam } = this.state;

    return (
        <div className="CurrentGame">
            <h1>Current Game</h1>
            {/* {currentTeams.map((team) => <h5 key={team.teamId}>{team.teamName}</h5>)} */}
            <div className="d-flex flex-wrap">
              {currentTeams.map((team) => <GameTeams key={team.teamId} team={team} />)}
            </div>
            <div className="UpNext">
              <h2>Up Next</h2>
                <p>{nextTeam.teamName}</p>
            </div>
        </div>
    );
  }
}

export default CurrentGame;
