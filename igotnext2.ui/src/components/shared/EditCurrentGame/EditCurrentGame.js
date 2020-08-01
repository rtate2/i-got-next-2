import React from 'react';
import MultiSelect from 'react-multi-select-component';
import './EditCurrentGame.scss';
import teamData from '../../../helpers/data/teamData';

class EditCurrentGame extends React.Component {
  state = {
    teams: [],
    selectedTeams: [],
  }

  componentDidMount() {
    teamData.getAllTeams()
      .then((teams) => this.setState({ teams }))
      .catch((error) => console.error(error, 'error from get all teams for edit current game'));
  }

  teamChange = (teamsFromMultiSelect) => {
    this.setState({ selectedTeams: teamsFromMultiSelect });
  }

  // updateCurrentGameEvent = (e) => {
  //   e.preventDefault();
  //   const { selectedTeams } = this.state;
  //   selectedTeams.map((team) => teamData.updateTeamCurrentlyPlayingStatus(team.value));
  //   this.props.history.push('/currentgame');
  // }

  updateCurrentGameEvent = (e) => {
    e.preventDefault();
    const { selectedTeams } = this.state;
    selectedTeams.map((team) => {
      teamData.updateTeamCurrentlyPlayingStatus(team.value)
        .then(() => {
          this.props.history.push('/currentgame');
        });
    });
  }

  render() {
    const renderPlayerOptions = this.state.teams.map((team) => ({ label: `${team.teamName}`, value: team.teamId }));

    return (
      <div className="EditCurrentGame">
        <h1>Edit Current Game</h1>
        <form>
          <div className="container d-flex">
            <label htmlFor="PlayerName"><h3>Teams on the List</h3></label>
              <label htmlFor="players"></label>
              <MultiSelect
                options={renderPlayerOptions}
                value={this.state.selectedTeams}
                onChange={this.teamChange}
                labelledBy={'Select'}
              />
          </div>
          <button className="btn btn-dark" onClick={this.updateCurrentGameEvent}>Save Matchup</button>
        </form>
      </div>
    );
  }
}

export default EditCurrentGame;
