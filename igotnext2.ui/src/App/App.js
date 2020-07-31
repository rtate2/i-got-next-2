import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import './App.css';
import Navbar from '../components/shared/Navbar/Navbar';
import Home from '../components/pages/Home/Home';
import Teams from '../components/pages/Teams/Teams';
import NewTeam from '../components/pages/NewTeam/NewTeam';
import Admin from '../components/pages/Admin/Admin';
import CurrentGame from '../components/pages/CurrentGame/CurrentGame';
import AvailablePlayers from '../components/pages/AvailablePlayers/AvailablePlayers';
import SingleTeamView from '../components/pages/SingleTeamView/SingleTeamView';
import EditCurrentGame from '../components/shared/EditCurrentGame/EditCurrentGame';
import authData from '../helpers/data/authData';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authedStatus = sessionStorage.getItem('adminId') != null;
  const routeChecker = (props) => (authedStatus === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  render() {
    return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/teams" exact component={Teams} />
          <Route path="/teams/new" exact component={NewTeam} />
          <Route path="/adminportal" exact component={Admin} />
          <Route path="/currentgame" exact component={CurrentGame} />
          <Route path="/availableplayers" exact component={AvailablePlayers} />
          <Route path="/teams/singleteamview/:teamId" exact component={SingleTeamView} />
          <Route path="/currentgame/edit" exact component={EditCurrentGame} />
        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
