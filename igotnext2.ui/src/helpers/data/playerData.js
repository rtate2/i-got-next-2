import axios from 'axios';

const getAllPlayers = () => new Promise((resolve, reject) => {
  axios.get('https://localhost:44317/api/players')
    .then((result) => {
      const allPlayers = result.data;
      resolve(allPlayers);
    })
    .catch((errFromGetAllTeams) => reject(errFromGetAllTeams));
});

export default { getAllPlayers };
