import React from 'react';
import MultiSelect from 'react-multi-select-component';
import moment from 'moment';
import playerData from '../../../helpers/data/playerData';
import teamData from '../../../helpers/data/teamData';
import basketball from '../../../images/basketball.png';
import './NewTeam.scss';

class NewTeam extends React.Component {
  state = {
    players: [],
    selectedPlayers: [],
    teamName: '',
    Date: '',
    IsAvailable: true,
    IsTeamCountFull: false,
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
    // get lenght of selectplayers
    // if length is > 5 isTeamCountFull == this.state.isteamfull (false)
    // else length == 5 then change state isteamcountfull from false to true
    const newTeam = {
      teamName: this.state.teamName,
      Date: moment(),
      isAvailable: this.state.isAvailable,
      isTeamCountFull: this.state.isTeamCountFull,
    };
    teamData.createTeam(newTeam)
      .then((theCreateTeam) => {
        this.state.selectedPlayers.forEach((player) => {
          playerData.updatePlayerTeamStatus(player.value, theCreateTeam.teamId);
        });
      })
      .then(() => {
        this.props.history.push('/teams');
      });
  }

  render() {
    const renderPlayerOptions = this.state.players.map((player) => ({ label: `${player.firstName} ${player.lastName}`, value: player.playerId }));

    return (
      <div className="container-fluid NewTeam text-center">
        <h1>Create Your New Team</h1>
          <div className="NewTeamForm">
            <form>
              <div className="form-group input-css">
                <label htmlFor="courtId"><h3>Team Name</h3></label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="teamName"
                  placeholder="Enter Team Name"
                  value={this.state.teamName}
                  onChange={this.nameChange}
                />
              </div>
              <div className="container d-flex">
              <div className="mulitSelection">
              <label htmlFor="PlayerName"><h3>Player Names</h3></label>
                  <label htmlFor="players"></label>
                  <MultiSelect
                    options={renderPlayerOptions}
                    value={this.state.selectedPlayers}
                    onChange={this.playerChange}
                    labelledBy={'Select'}
                    hasSelectAll={false}
                  />
              </div>
              </div>
              <button className="btn btn-dark saveButton" onClick={this.saveTeamEvent}>Save Team</button>
            </form>
          </div>
          <div>
            <img src={basketball} className="adminLogo" alt="basketball"></img>
          </div>
      </div>
    );
  }
}

export default NewTeam;
