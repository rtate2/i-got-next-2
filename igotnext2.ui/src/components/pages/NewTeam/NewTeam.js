import React from 'react';

import teamData from '../../../helpers/data/teamData';
import playerData from '../../../helpers/data/playerData';

import './NewTeam.scss';

class NewTeam extends React.Component {
  state = {
    teamName: '',
    date: '',
    court: '',
    player1: '',
    player2: '',
    player3: '',
    player4: '',
    player5: '',
    isAvailable: false,
    isTeamCountFull: true,
    players: [],
  }

  componentDidMount() {
    playerData.getAllPlayers()
      .then((players) => this.setState({ players }))
      .catch((error) => console.error('error from players', error));
  }

  saveTeamEvent = (e) => {
    e.preventDefault();
    const newTeam = {
      teamName: this.state.teamName,
      date: '',
      // time: this.state.time,
      player1: this.state.player1,
      player2: this.state.player2,
      player3: this.state.player3,
      player4: this.state.player4,
      player5: this.state.player5,
      isAvailable: this.state.isAvailable,
      isTeamCountFull: this.state.isTeamCountFull,
      courtId: this.state.courtId,
    };
    teamData.createTeam(newTeam)
      .then(() => {
        this.props.history.push('/teams');
        this.setState({
          TeamName: '', player1: '', player2: '', player3: '', player4: '', player5: '', CourtId: '',
        });
      });
    this.setState({
      TeamName: '', player1: '', player2: '', player3: '', player4: '', player5: '', CourtId: '',
    });
  }

  teamChange = (e) => {
    e.preventDefault();
    this.setState({ teamName: e.target.value });
  }

  courtChange = (e) => {
    e.preventDefault();
    this.setState({ court: e.target.value });
  }

  player1Change = (e) => {
    this.setState({ player1: e.target.value });
  }

  player2Change = (e) => {
    this.setState({ player2: e.target.value });
  }

  player3Change = (e) => {
    this.setState({ player3: e.target.value });
  }

  player4Change = (e) => {
    this.setState({ player4: e.target.value });
  }

  player5Change = (e) => {
    this.setState({ player5: e.target.value });
  }

  renderPlayerOptions = () => this.state.players.map((player) => {
    const name = `${player.firstName} ${player.lastName}`;
    if (name !== this.state.player1 || name !== this.state.player2 || name !== this.state.player3 || name !== this.state.player4 || name !== this.state.player5) {
      return ((<option key={player.playerId} id={player.playerId}>{player.firstName} {player.lastName}</option>));
    }
    return null;
  })

  render() {
    return (
      <div className="NewTeam">
        <h1>Create Your New Team</h1>
          <div className="container NewTeam2">
          <form>
          <div className="form-group input-css">
            <label htmlFor="team-name"><h3>Team Name</h3></label>
            <input
              type="text"
              className="form-control"
              id="team-name"
              placeholder="Enter Team Name"
              value={this.state.teamName}
              onChange={this.teamChange}
            />
            <label htmlFor="courtId"><h3>Court Number</h3></label>
            <input
              type="text"
              className="form-control"
              id="courtId"
              placeholder="Enter Court Number"
              value={this.state.court}
              onChange={this.courtChange}
            />
          </div>
          <h3>Player Names</h3>
          <div className="container d-flex">
          <div className="form-group fg">
            <select
            className="form-control select-css"
            id="player-name"
            value={this.state.player1}
            onChange={this.player1Change}>
              <option>Select Player 1</option>
              { this.renderPlayerOptions() }
            </select>
          </div>
          <div className="form-group fg">
          <select
            className="form-control select-css"
            id="player-name"
            value={this.state.player2}
            onChange={this.player2Change}>
              <option>Select Player 2</option>
              { this.renderPlayerOptions() }
            </select>
          </div>
          <div className="form-group fg">
            <select
            className="form-control select-css"
            id="player-name"
            value={this.state.player3}
            onChange={this.player3Change}>
              <option>Select Player 3</option>
              { this.renderPlayerOptions() }
            </select>
          </div>
          <div className="form-group fg">
            <select
            className="form-control select-css"
            id="exampleFormControlSelect1"
            value={this.state.player4}
            onChange={this.player4Change}>
              <option>Select Player 4</option>
              { this.renderPlayerOptions() }
            </select>
          </div>
          <div className="form-group fg">
            <select
            className="form-control select-css"
            id="exampleFormControlSelect1"
            value={this.state.player5}
            onChange={this.player5Change}>
              <option>Select Player 5</option>
              { this.renderPlayerOptions() }
            </select>
          </div>
          </div>
          <button className="btn btn-dark" onClick={this.saveTeamEvent}>Save Team</button>
        </form>
        </div>
      </div>
    );
  }
}

export default NewTeam;

// import React from 'react';

// import teamData from '../../../helpers/data/teamData';
// import playerData from '../../../helpers/data/playerData';

// import './NewTeam.scss';

// class NewTeam extends React.Component {
//   state = {
//     name: '',
//     date: '',
//     player1: '',
//     player2: '',
//     player3: '',
//     player4: '',
//     player5: '',
//     isWaitlist: false,
//     players: [],
//   }

//   componentDidMount() {
//     playerData.getAllPlayers()
//       .then((players) => this.setState({ players }))
//       .catch((error) => console.error('error from players', error));
//   }

//   saveTeamEvent = (e) => {
//     e.preventDefault();
//     const newTeam = {
//       name: this.state.name,
//       date: '',
//       player1: this.state.player1,
//       player2: this.state.player2,
//       player3: this.state.player3,
//       player4: this.state.player4,
//       player5: this.state.player5,
//       isAvailable: this.state.isAvailable,
//     };
//     teamData.createTeam(newTeam)
//       .then(() => {
//         this.props.history.push('/teams');
//         this.setState({
//           name: '', player1: '', player2: '', player3: '', player4: '', player5: '',
//         });
//       });
//     this.setState({
//       name: '', player1: '', player2: '', player3: '', player4: '', player5: '',
//     });
//   }

//   nameChange = (e) => {
//     e.preventDefault();
//     this.setState({ name: e.target.value });
//   }

//   player1Change = (e) => {
//     this.setState({ player1: e.target.value });
//   }

//   player2Change = (e) => {
//     this.setState({ player2: e.target.value });
//   }

//   player3Change = (e) => {
//     this.setState({ player3: e.target.value });
//   }

//   player4Change = (e) => {
//     this.setState({ player4: e.target.value });
//   }

//   player5Change = (e) => {
//     this.setState({ player5: e.target.value });
//   }

//   renderPlayerOptions = () => this.state.players.map((player) => {
//     const name = `${player.firsName} ${player.lastName}`;
//     if (name !== this.state.player1 || name !== this.state.player2 || name !== this.state.player3 || name !== this.state.player4 || name !== this.state.player5) {
//       return ((<option key={player.id} id={player.id}>{player.firstName} {player.lastName}</option>));
//     }
//     return null;
//   })

//   render() {
//     return (
//       <div className="NewTeam">
//         <h1>Create Your New Team</h1>
//         <div className="container NewTeam2">
//         <form>
//           <div className="form-group input-css">
//             <label htmlFor="team-name"><h3>Team Name</h3></label>
//             <input
//               type="text"
//               className="form-control"
//               id="team-name"
//               placeholder="Enter Team Name"
//               value={this.state.name}
//               onChange={this.nameChange}
//             />
//           </div>
//           <h3>Player Names</h3>
//           <div className="container d-flex">
//           <div className="form-group fg">
//             <select
//             className="form-control select-css"
//             id="player-name"
//             value={this.state.player1}
//             onChange={this.player1Change}>
//               <option>Select Player 1</option>
//               { this.renderPlayerOptions() }
//             </select>
//           </div>
//           <div className="form-group fg">
//           <select
//             className="form-control select-css"
//             id="player-name"
//             value={this.state.player2}
//             onChange={this.player2Change}>
//               <option>Select Player 2</option>
//               { this.renderPlayerOptions() }
//             </select>
//           </div>
//           <div className="form-group fg">
//             <select
//             className="form-control select-css"
//             id="player-name"
//             value={this.state.player3}
//             onChange={this.player3Change}>
//               <option>Select Player 3</option>
//               { this.renderPlayerOptions() }
//             </select>
//           </div>
//           <div className="form-group fg">
//             <select
//             className="form-control select-css"
//             id="exampleFormControlSelect1"
//             value={this.state.player4}
//             onChange={this.player4Change}>
//               <option>Select Player 4</option>
//               { this.renderPlayerOptions() }
//             </select>
//           </div>
//           <div className="form-group fg">
//             <select
//             className="form-control select-css"
//             id="exampleFormControlSelect1"
//             value={this.state.player5}
//             onChange={this.player5Change}>
//               <option>Select Player 5</option>
//               { this.renderPlayerOptions() }
//             </select>
//           </div>
//           </div>
//           <button className="btn btn-dark" onClick={this.saveTeamEvent}>Save Team</button>
//         </form>
//         </div>
//       </div>
//     );
//   }
// }

// export default NewTeam;
