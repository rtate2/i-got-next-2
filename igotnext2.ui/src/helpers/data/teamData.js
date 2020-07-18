import axios from 'axios';

const getAllTeams = () => new Promise((resolve, reject) => {
  axios.get('https://localhost:44317/api/teams')
    .then((result) => {
      const allTeams = result.data;
      resolve(allTeams);
    })
    .catch((errFromGetAllTeams) => reject(errFromGetAllTeams));
});

const getTeamsWithPlayers = () => new Promise((resolve, reject) => {
  axios.get('https://localhost:44317/api/teams/teamswithplayers')
    .then((result) => {
      const allTeams = result.data;
      resolve(allTeams);
    })
    .catch((errFromGetAllTeams) => reject(errFromGetAllTeams));
});

const createTeam = (newTeam) => axios.post('https://localhost:44317/api/teams', newTeam);

export default { getAllTeams, getTeamsWithPlayers, createTeam };
