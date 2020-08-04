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

  renderTeamCountButtons = () => {
    if (this.props.team.isTeamCountFull === false) {
      return <Link className="btn btn-secondary btn-outline-dark jTeamBtn" to={`/teams/singleteamview/${this.props.team.teamId}`}>Join Team</Link>;
    }
    return <Link className="btn btn-warning btn-outline-dark vTeamBtn" to={`/teams/singleteamview/${this.props.team.teamId}`}>View Team</Link>;
  }

  render() {
    const { team, authStatus } = this.props;

    return (
      <div className="Team">
        <div className="card teamCard">
          {<p>Date: {team.date}</p>}
          <div className="card-body">
            <h4 className="card-title">{team.teamName}</h4>
            <div>
              {this.renderTeamCountButtons()}
            </div>
            { authStatus && <button className=" btn btn-danger deleteButton" onClick={this.removeTeamEvent}>Delete</button> }
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
