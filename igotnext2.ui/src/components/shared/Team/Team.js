import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './Team.scss';
import teamShape from '../../../helpers/propz/teamShape';

class Team extends React.Component {
  static propTypes = {
    team: teamShape.teamShape,
  }

  render() {
    const { team } = this.props;

    return (
      <div className="Team">
        <div className="card teamCard">
          <button type="button" className=" btn btn-link d-flex justify-content-end deleteButton" aria-label="Close">&times;</button>
          {<p>Date: {moment(team.Date).format('dddd, MMMM Do YYYY')}</p>}
          {<p>Time: {moment(team.time).format('h:mm:ss a')}</p>}
          <div className="card-body">
            <h4 className="card-title">{team.teamName}</h4>
            <Link className="btn btn-outline-dark teamBtn" to={`/teams/${team.id}`}>View Team</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
