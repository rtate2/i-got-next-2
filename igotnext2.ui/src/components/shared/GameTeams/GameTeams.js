import React from 'react';
import './GameTeams.scss';

class GameTeams extends React.Component {
  render() {
    const { team } = this.props;

    return (
      <div className="Team">
        <div className="card teamCard">
          <div className="card-body">
            <h4 className="card-title">{team.teamName}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default GameTeams;
