import axios from 'axios';

const loginUser = (adminName, adminPassword) => new Promise((resolve, reject) => {
  const url = `https://localhost:44317/api/adminportal/admin/${adminName}/password/${adminPassword}`;
  axios.get(url)
    .then((userResponse) => {
      sessionStorage.setItem('adminId', userResponse.data.adminId);
      resolve(userResponse.data);
    })
    .catch((error) => console.error(error));
});

const logoutAdmin = () => {
  sessionStorage.removeItem('adminId');
};

const authed = () => !!sessionStorage.getItem('adminId');

const getLoggedInUserId = () => sessionStorage.getItem('adminId');

export default {
  loginUser,
  logoutAdmin,
  authed,
  getLoggedInUserId,
};
