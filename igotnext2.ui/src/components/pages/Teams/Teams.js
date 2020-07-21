import React from 'react';
import './Teams.scss';
import Team from '../../shared/Team/Team';
import teamData from '../../../helpers/data/teamData';
import AddTeam from '../NewTeam/AddTeam';

class Teams extends React.Component {
  state = {
    teams: [],
    showTeamForm: false,
  }

  componentDidMount() {
    teamData.getAllTeams()
      .then((teams) => this.setState({ teams }))
      .catch((error) => (error, 'error from teams with players'));
  }

  addTeam = (newTeam) => {
    teamData.createTeam(newTeam)
      .then(() => {
        this.getTeamsWithPlayers();
        this.setState({ showTeamForm: false });
      })
      .catch((error) => console.error({ error }));
  }

  render() {
    const { teams } = this.state;

    return (
        <div className="Teams">
            <h1>Teams</h1>
            { this.state.showTeamForm && <AddTeam addTeam={this.addTeam} /> }
            <div className="items d-flex flex-wrap">
              {teams.map((team) => <Team key={team.teamId} team={team} />)}
            </div>
        </div>
    );
  }
}

export default Teams;
