import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Team.scss';
import teamShape from '../../../helpers/propz/teamShape';

class Team extends React.Component {
  static propTypes = {
    team: teamShape.teamShape,
    teamToRemove: PropTypes.func,
  }

  removeTeamEvent = (e) => {
    e.preventDefault();
    const { team, teamToRemove } = this.props;
    teamToRemove(team.teamId);
  }

  render() {
    const { team, authStatus } = this.props;

    return (
      <div className="Team">
        <div className="card teamCard">
          {/* <button type="button" className=" btn btn-link d-flex justify-content-end deleteButton" aria-label="Close">&times;</button> */}
          {<p>Date: {team.date}</p>}
          <div className="card-body">
            <h4 className="card-title">{team.teamName}</h4>
            <Link className="btn btn-outline-dark teamBtn" to={`/teams/singleteamview/${team.teamId}`}>View Team</Link>
            { authStatus && <button className=" btn btn-danger" onClick={this.removeTeamEvent}>Delete</button> }
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
