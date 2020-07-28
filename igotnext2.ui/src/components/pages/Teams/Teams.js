import React from 'react';
import './Teams.scss';
import Team from '../../shared/Team/Team';
import teamData from '../../../helpers/data/teamData';
import AddTeam from '../NewTeam/NewTeam';
import playerData from '../../../helpers/data/playerData';

class Teams extends React.Component {
  state = {
    teams: [],
    showTeamForm: false,
    authStatus: false,
    teamPlayers: [],
  }

  componentDidMount() {
    this.getPlayersByTeamId();
    teamData.getAllTeams()
      .then((theTeams) => this.setState({ teams: theTeams, authStatus: sessionStorage.getItem('adminId') != null }))
      .catch((error) => (error, 'error from teams with players'));
  }

  getPlayersByTeamId = (teamId) => {
    playerData.getPlayersByTeamId(teamId)
      .then((teamPlayers) => this.setState({ teamPlayers }))
      .catch((error) => console.error(error, 'error from get players by id'));
  }

  // teamData.createTeam(newTeam)
  //     .then((theCreateTeam) => {
  //       this.state.selectedPlayers.forEach((player) => {
  //         playerData.updatePlayerTeamStatus(player.value, theCreateTeam.teamId);
  //       });
  //     })

  //     this.getPlayersByTeamId(players);
  //     playerData.updatePlayerTeamStatus(player.value, players.teamId)
  //   }
  // })

  removeTeam = (teamId) => {
    teamData.removeTeamFromList(teamId)
      .then((playerTeamId) => {
        this.state.teamPlayers.forEach((player) => {
          playerData.updatePlayerTeamStatus(player.value, playerTeamId.teamId);
        });
      })
      .then(() => teamData.getAllTeams())
      .then((teams) => this.setState({ teams }))
      .catch((error) => console.error(error, 'error from remove team from list'));
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
    const { teams, authStatus } = this.state;

    return (
        <div className="container-fluid Teams">
            <h1>Teams</h1>
            { this.state.showTeamForm && <AddTeam addTeam={this.addTeam} /> }
            <div className="items d-flex flex-wrap">
              {teams.map((team) => <Team key={team.teamId} team={team} authStatus={authStatus} teamToRemove={this.removeTeam} />)}
            </div>
        </div>
    );
  }
}

export default Teams;
