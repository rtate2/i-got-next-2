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
    .catch((errFromGetTeamsWithPlayers) => reject(errFromGetTeamsWithPlayers));
});

const createTeam = (newTeam) => new Promise((resolve, reject) => {
  axios.post('https://localhost:44317/api/teams', newTeam)
    .then((result) => {
      const newlyCreatedTeam = result.data;
      resolve(newlyCreatedTeam);
    })
    .catch((errFromCreateTeams) => reject(errFromCreateTeams));
});

const getSingleTeam = (teamId) => axios.get(`https://localhost:44317/api/teams/singleteam/${teamId}`);

const getCurrentGames = () => new Promise((resolve, reject) => {
  axios.get('https://localhost:44317/api/teams/playergameview/currentgames')
    .then((result) => {
      const gameTeams = result.data;
      resolve(gameTeams);
    })
    .catch((errFromGetGameTeams) => reject(errFromGetGameTeams));
});

const getTeamUpNext = () => new Promise((resolve, reject) => {
  axios.get('https://localhost:44317/api/teams/playergameview/nexttoplay')
    .then((result) => {
      const nextTeam = result.data;
      resolve(nextTeam);
    })
    .catch((errFromGetNextTeams) => reject(errFromGetNextTeams));
});

const removeTeamFromList = (teamId) => axios.put(`https://localhost:44317/api/adminportal/remove/${teamId}`);

const updateSingleTeam = (teamId, newTeamObj) => axios.put(`https://localhost:44317/api/teams/team/${teamId}/edit`, newTeamObj);

const getTeamMemberCount = (teamId) => axios.get(`https://localhost:44317/api/teams/team/${teamId}/count`);

const updateTeamCurrentlyPlayingStatus = (teamId) => axios.put(`https://localhost:44317/api/adminportal/currentgame/team/${teamId}`);

export default {
  getAllTeams,
  getTeamsWithPlayers,
  createTeam,
  getSingleTeam,
  getCurrentGames,
  getTeamUpNext,
  removeTeamFromList,
  updateSingleTeam,
  getTeamMemberCount,
  updateTeamCurrentlyPlayingStatus,
};
