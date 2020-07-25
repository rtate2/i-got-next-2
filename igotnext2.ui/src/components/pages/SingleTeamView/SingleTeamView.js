import React from 'react';
import { Link } from 'react-router-dom';
import './SingleTeamView.scss';
import teamData from '../../../helpers/data/teamData';
import playerData from '../../../helpers/data/playerData';

class SingleTeamView extends React.Component {
  state = {
    team: {},
    players: [],
  };

  componentDidMount() {
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

  render() {
    const { team, players } = this.state;

    return (
      <div className="SingleTeamView">
        <h1>Single Team View</h1>
        <h3 className="card-title">{team.teamName}</h3>
        {players.map((player) => <h5>{player.firstName} {player.lastName}</h5>)}
        <Link className="btn btn-success" to={'/teams'}>Back to Teams</Link>
      </div>
    );
  }
}

export default SingleTeamView;
