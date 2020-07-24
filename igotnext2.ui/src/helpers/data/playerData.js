import axios from 'axios';

const getAllPlayers = () => new Promise((resolve, reject) => {
  axios.get('https://localhost:44317/api/players')
    .then((result) => {
      const allPlayers = result.data;
      resolve(allPlayers);
    })
    .catch((errFromGetAllTeams) => reject(errFromGetAllTeams));
});

// const getPlayerById = (player) => new Promise((resolve, reject) => {
//   axios.get(`https://localhost:44317/api/players/${player.playerId}`)
//     .then((result) => {
//       const playerr = result.data;

//       resolve(playerr);
//     })
//     .catch((error) => reject(error));
// });
const getPlayerById = (playerId) => axios.get(`https://localhost:44317/api/players/player/${playerId}`);

const getAvailablePlayers = () => new Promise((resolve, reject) => {
  axios.get('https://localhost:44317/api/players/availableplayers')
    .then((result) => {
      const allAvailablePlayers = result.data;
      resolve(allAvailablePlayers);
    })
    .catch((errFromGetAllTeams) => reject(errFromGetAllTeams));
});

const updatePlayerTeamStatus = (player, teamId) => axios.put(`https://localhost:44317/api/players/player/${player.playerId}/team/${teamId}`, player, teamId);

const getPlayersByTeamId = (teamId) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44317/api/players/team/${teamId}`)
    .then((result) => {
      const allTeams = result.data;
      resolve(allTeams);
    })
    .catch((errFromGetAllTeams) => reject(errFromGetAllTeams));
});

export default {
  getAllPlayers,
  getAvailablePlayers,
  updatePlayerTeamStatus,
  getPlayerById,
  getPlayersByTeamId,
};
