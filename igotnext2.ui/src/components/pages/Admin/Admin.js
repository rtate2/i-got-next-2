import React from 'react';
import './Admin.scss';
import authData from '../../../helpers/data/authData';
import basketball from '../../../images/basketball.png';

class Admin extends React.Component {
  state = {
    adminName: '',
    adminPassword: '',
    activeAdmin: {},
  }

  handleFieldChange = (e) => {
    const stateToChange = {};
    stateToChange[e.target.id] = e.target.value;
    this.setState(stateToChange);
  }

  loginClickEvent = (e) => {
    e.preventDefault();
    authData.loginUser(this.state.adminName, this.state.adminPassword).then((user) => {
      this.props.history.push('/teams');
    });
  }

  logoutClickEvent = () => {
    authData.logoutAdmin();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="container-fluid Admin text-center">
        <h1>Administrator Portal</h1>
        <form className="AdminForm">
          <div className="form-group">
            <label htmlFor="adminName" className="inputTitles">Administrator Name:</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="adminName"
              aria-describedby="adminHelp"
              placeholder="Enter Administrator Name"
              value={this.state.adminName}
              onChange={this.handleFieldChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="adminPassword" className="inputTitles">Password:</label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="adminPassword"
              autoComplete="off"
              placeholder="Enter Password"
              value={this.state.adminPassword}
              onChange={this.handleFieldChange}
              />
            <small id="emailHelp" className="form-text text-muted">Never share your user name and password with anyone else.</small>
          </div>
          <button type="submit" className="btn btn-primary logIn" onClick={this.loginClickEvent}>Login</button>
          <button className="btn btn-danger" type="submit" onClick={this.logoutClickEvent}>Logout</button>
        </form>
        <div>
          <img src={basketball} className="adminLogo" alt="basketball"></img>
        </div>
      </div>
    );
  }
}

export default Admin;
