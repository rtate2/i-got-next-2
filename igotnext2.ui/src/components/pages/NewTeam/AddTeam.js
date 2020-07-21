import React from 'react';
import moment from 'moment';
import playerData from '../../../helpers/data/playerData';
import teamData from '../../../helpers/data/teamData';

class AddTeam extends React.Component {
  state = {
    availablePlayers: [],
    player1: null,
    player2: null,
    player3: null,
    player4: null,
    player5: null,
    teamName: '',
    Date: '',
    IsAvailable: true,
    // change in database, cs file and here
    IsTeamCountFull: false,
    selectedPlayers: [],
  }

  componentDidMount() {
    playerData.getAvailablePlayers()
      .then((availablePlayers) => {
        const allPlayers = availablePlayers.map((player) => ({
          ...player,
          isSelected: false,
        }));
        this.setState({ availablePlayers: allPlayers });
      })
      .catch((error) => console.error(error, 'error from get available players'));
  }

  saveTeamEvent = (e) => {
    e.preventDefault();
    // create an array to hold players
    const theTeamPlayers = [Number(this.state.player1), Number(this.state.player2), Number(this.state.player3), Number(this.state.player4), Number(this.state.player5)];
    const tempPlayers = [];

    theTeamPlayers.forEach((playas) => {
      if (playas !== 0) {
        tempPlayers.push(playas);
      }
    });

    if (tempPlayers.length === 5) {
      this.setState({ isTeamCountFull: true });
    }
    const newTeam = {
      teamName: this.state.teamName,
      Date: moment(),
      isAvailable: this.state.isAvailable,
      isTeamCountFull: this.state.isTeamCountFull,
    };
    teamData.createTeam(newTeam)
      .then((theCreateTeam) => {
        // create a list to store the players
        const newTeamPlayersId = [Number(this.state.player1), Number(this.state.player2), Number(this.state.player3), Number(this.state.player4), Number(this.state.player5)];
        newTeamPlayersId.forEach((playerId) => {
          console.log(playerId, 'new Team Players Id');
          if (playerId !== 0) {
            playerData.updatePlayerTeamStatus(playerId, theCreateTeam.teamId);
            console.log(theCreateTeam.teamId, 'new Team Team Id');
          }
        });
      })
      .then(() => {
        this.props.history.push('/teams');
        // this.setState({
        //   teamName: '',
        // });
        // this.setState({
        //   teamName: '',
        // });
      });
  }

  handleFieldChange = (e) => {
    const stateToChange = {};
    stateToChange[e.target.id] = e.target.value;
    // stateToChange.filteredPlayers = this.state.availablePlayers.filter((player) => player.playerId != e.target.value); // filter out the player that is selected
    stateToChange.availablePlayers = this.state.availablePlayers.map((player) => {
      if (player.playerId == e.target.value) {
        return { ...player, isSelected: !player.isSelected };
      }
      return player;
    });
    this.setState(stateToChange);
  }

  // playerChange = (e) => {
  //   console.log(e.target.value);
  //   e.preventDefault();
  //   const filterPlayers = this.state.availablePlayers.filter((player) => player.playerId === e.target.value);
  //   return filterPlayers;
  // // this.setState((selectedPlayers) => ({ selectedPlayers: [...this.state.selectedPlayers, filterPlayers] }));
  // filterPlayers.push(this.setState((selectedPlayers) => ({ selectedPlayers: [filterPlayers, ...this.state.selectedPlayers] })));
  // console.log(this.state.selectedPlayers);
  // this.setState((selectedPlayers) => ({ selectedPlayers: [...filterPlayers, selectedPlayers] }));

  // const newStateArray = this.state.availablePlayers.slice();
  // newStateArray.push(this.state.selectedPlayers);
  // this.setState({ selectedPlayers: newStateArray });

  // const array = [...filterPlayers]; // make a separate copy of the array
  // console.log(array, 'array info');
  // const index = array.indexOf(e.target.value);
  // if (index !== -1) {
  //   array.splice(index, 1);
  //   this.setState({ filterPlayers: this.state.selectedPlayers });
  // }

  // const array = [...this.state.selectedPlayers]; // make a separate copy of the array
  // const index = array.indexOf(e.target.value);
  // if (index !== -1) {
  //   array.splice(index, 1);
  //   this.setState({ selectedPlayers: filterPlayers });
  // }

  // this.setState((filterPlayers) => ({ selectedPlayers: [{ selectedPlayers: filterPlayers, ...filterPlayers }] }));
  // this.setState(prevState => ({ myArray: [ {"name": "object"}, ...prevState.myArray] }));

  // const listedPlayers = this.setState({ selectedPlayers });
  // filterPlayers.push(listedPlayers);

  // filterPlayers.push(this.state.selectedPlayers);
  // this.setState({ selectedPlayers: [...this.state.selectedPlayers, ...filterPlayers] });
  // this.setState({ myArray: [...this.state.myArray, 'new value'] })

  // this.setState(prevState => ({
  //   myArray: [...prevState.myArray, "new value"]
  // }))
  // }

  renderPlayerOptions = () => this.state.availablePlayers.map((player) => {
    const name = `${player.firstName} ${player.lastName}`;
    // if (name !== this.state.player1 || name !== this.state.player2 || name !== this.state.player3 || name !== this.state.player4 || name !== this.state.player5) {
    // if (!player.isSelected) {
    return ((<option key={player.playerId} value={player.playerId} id={player.playerId}>{player.firstName} {player.lastName}</option>));
    // }
    // return null;
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
                  placeholder="Enter Team Name"
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
