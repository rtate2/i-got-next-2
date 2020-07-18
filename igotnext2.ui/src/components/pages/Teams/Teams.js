import React from 'react';
import './Teams.scss';
import Team from '../../shared/Team/Team';
import teamData from '../../../helpers/data/teamData';

class Teams extends React.Component {
  state = {
    teams: [],
  }

  componentDidMount() {
    teamData.getTeamsWithPlayers()
      .then((teams) => this.setState({ teams }))
      .catch((error) => (error, 'error from teams with players'));
  }

  render() {
    const { teams } = this.state;
    console.log(teams);

    return (
        <div className="Teams">
            <h1>Teams</h1>
            {teams.map((team) => <Team key={team.teamId} team={team} />)}
        </div>
    );
  }
}

export default Teams;
