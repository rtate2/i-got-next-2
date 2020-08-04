import React from 'react';
import './AvailablePlayers.scss';
import playerData from '../../../helpers/data/playerData';
import Player from '../../shared/Player/Player';

class AvailablePlayers extends React.Component {
  state = {
    players: [],
  }

  componentDidMount() {
    playerData.getAvailablePlayers()
      .then((players) => this.setState({ players }))
      .catch((error) => console.error(error, 'error from get available players'));
  }

  render() {
    const { players } = this.state;

    return (
      <div className="AvailablePlayers">
        <h1>Available Players</h1>
        <div className="d-flex flex-wrap Players">
          { players.map((player) => <Player key={player.playerId} player={player} />)}
        </div>
      </div>
    );
  }
}

export default AvailablePlayers;
