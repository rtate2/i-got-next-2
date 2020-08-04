import React from 'react';
import { Link } from 'react-router-dom';
import './SingleTeamView.scss';
import teamData from '../../../helpers/data/teamData';
import playerData from '../../../helpers/data/playerData';
import hoop from '../../../images/bballplayers.png';

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
      return <button className="btn btn-primary btn-outline-dark JoinTeamButt" onClick={this.joinTeamEvent}>Update Team</button>;
    }
    return <Link className="btn btn-secondary btn-outline-dark JoinTeamButt" to={'/teams'}>Return to All Teams View</Link>;
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
                  className="form-control select-css SingleTeamForm"
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
              {/* <button className="btn btn-dark" onClick={this.joinTeamEvent}>Save Team</button> */}
            </form>;
    }
    return null;
  }

  render() {
    const { team, players } = this.state;

    return (
      <div className="container-fluid SingleTeamView text-center">
        <h1 className="SingleTeamTitle">Single Team View</h1>
        <div className="TeamCard">
          <h3 className="card-title TeamNames"><b>{team.teamName}</b></h3>
          {players.map((player) => <h5 key={player.playerId}>{player.firstName} {player.lastName}</h5>)}
          {/* <Link className="btn btn-success" to={'/teams'}>Back to Teams</Link> */}
          {this.playerCount()}
          {this.buildButtons()}
        </div>
        <div>
          <img src={hoop} className="TeamLogo" alt="basketball hoop"></img>
        </div>
      </div>
    );
  }
}

export default SingleTeamView;
