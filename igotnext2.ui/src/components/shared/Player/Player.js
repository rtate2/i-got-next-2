import React from 'react';
import './Player.scss';
import playerShape from '../../../helpers/propz/playerShape';

class Player extends React.Component {
  propType = {
    player: playerShape.playerShape,
  }

  render() {
    const { player } = this.props;

    return (
      <div className="Player col-3 mb-3">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">{player.firstName} {player.lastName}</h4>
          </div>
      </div>
      </div>
    );
  }
}

export default Player;
