import React from 'react';
import './GameTeams.scss';

class GameTeams extends React.Component {
  render() {
    const { team } = this.props;

    return (
      <div className="Team">
        <div className="card teamCard">
          {/* <button type="button" className=" btn btn-link d-flex justify-content-end deleteButton" aria-label="Close">&times;</button> */}
          <div className="card-body">
            <h4 className="card-title">{team.teamName}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default GameTeams;
