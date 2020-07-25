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

const createTeam = (newTeam) => new Promise((resolve, reject) => {
  axios.post('https://localhost:44317/api/teams', newTeam)
    .then((result) => {
      const newlyCreatedTeam = result.data;
      resolve(newlyCreatedTeam);
    })
    .catch((errFromGetAllTeams) => reject(errFromGetAllTeams));
});

const getSingleTeam = (teamId) => axios.get(`https://localhost:44317/api/teams/singleteam/${teamId}`);

export default {
  getAllTeams,
  getTeamsWithPlayers,
  createTeam,
  getSingleTeam,
};
