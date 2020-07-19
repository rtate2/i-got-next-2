import React from 'react';
import playerData from '../../../helpers/data/playerData';

class AddTeam extends React.Component {
  state = {
    availablePlayers: [],
    player1: null,
    player2: null,
    player3: null,
    player4: null,
    player5: null,
    teamName: '',
    isAvailable: true,
    // change in database, cs file and here
    isTeamCountFull: false,

  }

  componentDidMount() {
    playerData.getAvailablePlayers()
      .then((availablePlayers) => this.setState({ availablePlayers }))
      .catch((error) => console.error(error, 'error from get available players'));
  }

  handleFieldChange = (e) => {
    const stateToChange = {};
    stateToChange[e.target.id] = e.target.value;
    this.setState(stateToChange);
  }

  renderPlayerOptions = () => this.state.availablePlayers.map((player) => {
    const name = `${player.firstName} ${player.lastName}`;
    if (name !== this.state.player1 || name !== this.state.player2 || name !== this.state.player3 || name !== this.state.player4 || name !== this.state.player5) {
      return ((<option key={player.playerId} value={player.playerId} id={player.playerId}>{player.firstName} {player.lastName}</option>));
    }
    return null;
  })

  render() {
    return (
      <div>
        <h1>Add a Team</h1>
        <div className="NewTeam">
          <h1>Create Your New Team</h1>
          <div className="container NewTeam2">
            <form>
              <div className="form-group input-css">
                <label htmlFor="courtId"><h3>Team Name</h3></label>
                <input
                  type="text"
                  className="form-control"
                  id="teamName"
                  placeholder="Enter Enter Team Name"
                  value={this.state.teamName}
                  onChange={this.handleFieldChange}
                />
              </div>
              <h3>Player Names</h3>
              <div className="container d-flex">
                <div className="form-group fg">
                  <select
                  className="form-control select-css"
                  id="player1"
                  value={this.state.player1}
                  onChange={this.handleFieldChange}>
                    <option>Select Player 1</option>
                    { this.renderPlayerOptions() }
                  </select>
                </div>
                <div className="form-group fg">
                  <select
                  className="form-control select-css"
                  id="player2"
                  value={this.state.player2}
                  onChange={this.handleFieldChange}>
                    <option>Select Player 2</option>
                    { this.renderPlayerOptions() }
                  </select>
                </div>
                <div className="form-group fg">
                  <select
                  className="form-control select-css"
                  id="player3"
                  value={this.state.player3}
                  onChange={this.handleFieldChange}>
                    <option>Select Player 3</option>
                    { this.renderPlayerOptions() }
                  </select>
                </div>
                <div className="form-group fg">
                  <select
                  className="form-control select-css"
                  id="player4"
                  value={this.state.player4}
                  onChange={this.handleFieldChange}>
                    <option>Select Player 4</option>
                    { this.renderPlayerOptions() }
                  </select>
                </div>
                <div className="form-group fg">
                  <select
                  className="form-control select-css"
                  id="player5"
                  value={this.state.player5}
                  onChange={this.handleFieldChange}>
                    <option>Select Player 5</option>
                    { this.renderPlayerOptions() }
                  </select>
                </div>
              </div>
              <button className="btn btn-dark" onClick={this.saveTeamEvent}>Save Team</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTeam;
