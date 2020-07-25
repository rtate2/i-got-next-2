import React from 'react';
import MultiSelect from 'react-multi-select-component';
import moment from 'moment';
import playerData from '../../../../helpers/data/playerData';
import teamData from '../../../../helpers/data/teamData';

class Test extends React.Component {
  state = {
    players: [],
    selectedPlayers: [],
    teamName: '',
    Date: '',
    IsAvailable: true,
    IsTeamCountFull: false,
    // returnedPlayer: [],
  }

  componentDidMount() {
    playerData.getAvailablePlayers()
      .then((players) => this.setState({ players }))
      .catch((error) => console.error(error));
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ teamName: e.target.value });
  }

  playerChange = (playersFromMultiSelect) => {
    this.setState({ selectedPlayers: playersFromMultiSelect });
  }

  saveTeamEvent = (e) => {
    e.preventDefault();
    const playerObjects = [];

    const newTeam = {
      teamName: this.state.teamName,
      Date: moment(),
      isAvailable: this.state.isAvailable,
      isTeamCountFull: this.state.isTeamCountFull,
    };
    // This is part of Jameka's code I recently commented to try Jisie's
    // this.state.selectedPlayers.forEach((player) => {
    //   playerData.getPlayerById(player.value)
    //     .then((returnedPlayer) => this.setState({ returnedPlayer: playerObjects.push(returnedPlayer) }));
    //   // .then((returnedPlayer) => playerObjects.push(returnedPlayer));
    //   console.log(this.returnedPlayer, 'error from returned player');
    //   // debugger;
    // });
    teamData.createTeam(newTeam)
      .then((theCreateTeam) => {
        this.state.selectedPlayers.forEach((player) => {
          console.log(player);
          playerData.updatePlayerTeamStatus(player.value, theCreateTeam.teamId);
        });
        debugger;

        // create a list to store the players
        // const newTeamPlayersId = [Number(this.state.player1), Number(this.state.player2), Number(this.state.player3), Number(this.state.player4), Number(this.state.player5)];
        // newTeamPlayersId.forEach((playerId) => {
        //   if (playerId !== 0) {
        //     playerData.updatePlayerTeamStatus(playerId, theCreateTeam.teamId);
        //   }});

        // This is part of Jameka's code I recently commented to try Jisie's
        // const playerObjectsArray = playerObjects;
        // playerObjectsArray.forEach((playa) => {
        //   playerData.updatePlayerTeamStatus(playa, theCreateTeam.teamId);
        // });
      })
      .then(() => {
        this.props.history.push('/teams');
      });
  }

  render() {
    const renderPlayerOptions = this.state.players.map((player) => ({ label: `${player.firstName} ${player.lastName}`, value: player.playerId }));

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
                  placeholder="Enter Team Name"
                  value={this.state.teamName}
                  onChange={this.nameChange}
                />
              </div>
              <div className="container d-flex">
              <div className="">
              <label htmlFor="PlayerName"><h3>Player Names</h3></label>
                  <label htmlFor="players"></label>
                  <MultiSelect
                    options={renderPlayerOptions}
                    value={this.state.selectedPlayers}
                    onChange={this.playerChange}
                    labelledBy={'Select'}
                  />
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

export default Test;
