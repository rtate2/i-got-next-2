import React from 'react';
import { Link } from 'react-router-dom';
import './SingleTeamView.scss';
import teamData from '../../../helpers/data/teamData';
import playerData from '../../../helpers/data/playerData';

class SingleTeamView extends React.Component {
  state = {
    team: {},
    players: [],
    allAvailablePlayers: [],
    addedPlayerId: 0,
  };

  componentDidMount() {
    this.getAllAvailablePlayers();
    const { teamId } = this.props.match.params;
    this.getPlayersByTeam(teamId);
    teamData.getSingleTeam(teamId)
      .then((response) => {
        this.setState({ team: response.data });
      })
      .catch((error) => console.error(error, 'error from get single team'));
  }

  getPlayersByTeam(teamId) {
    playerData.getPlayersByTeamId(teamId)
      .then((players) => {
        this.setState({ players });
      })
      .catch((error) => console.error(error, 'error from get players by team id'));
  }

  getAllAvailablePlayers = () => {
    playerData.getAvailablePlayers()
      .then((allAvailablePlayers) => {
        this.setState({ allAvailablePlayers });
      })
      .catch((error) => console.error(error, 'error from get available players'));
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ addedPlayerId: e.target.value });
  }

  buildButtons = () => {
    if (this.state.team.isTeamCountFull === false) {
      return <button className="btn btn-outline-dark">Join Team</button>;
    }
    return <Link className="btn btn-secondary " to={'/teams'}>Return to All Teams View</Link>;
  }

  joinTeamEvent = (e) => {
    e.preventDefault();
    const { teamId } = this.props.match.params;
    playerData.updatePlayerTeamStatus(this.state.addedPlayerId, teamId)
      .then(() => {
        this.props.history.push('/teams');
      });
  }

  playerCount = () => {
    if (this.state.players.length < 5) {
      return <form>
               <div className="container d-flex">
                <div className="form-group fg">
                  <select
                  className="form-control select-css"
                  id="player-name"
                  value={this.state.addedPlayerId}
                  onChange={this.nameChange}
                  >
                    <option>Select Player to Add</option>
                    {this.state.allAvailablePlayers.map((availPlayers) => <option
                        value={availPlayers.playerId}
                        key={availPlayers.playerId}
                        id={availPlayers.playerId}>{availPlayers.firstName} {availPlayers.lastName}</option>)}
                  </select>
                </div>
              </div>
              <button className="btn btn-dark" onClick={this.joinTeamEvent}>Save Team</button>
            </form>;
    }
    return null;
  }

  // teamData.createTeam(newTeam)
  //     .then((theCreateTeam) => {
  //       this.state.selectedPlayers.forEach((player) => {
  //         playerData.updatePlayerTeamStatus(player.value, theCreateTeam.teamId);
  //       });
  //     })
  //     .then(() => {
  //       this.props.history.push('/teams');

  render() {
    const { team, players } = this.state;

    return (
      <div className="SingleTeamView">
        <h1>Single Team View</h1>
        <h3 className="card-title">{team.teamName}</h3>
        {players.map((player) => <h5 key={player.playerId}>{player.firstName} {player.lastName}</h5>)}
        {/* <Link className="btn btn-success" to={'/teams'}>Back to Teams</Link> */}
        {this.playerCount()}
        {this.buildButtons()}
      </div>
    );
  }
}

export default SingleTeamView;
