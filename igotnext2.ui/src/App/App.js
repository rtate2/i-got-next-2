import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import './App.css';
import Navbar from '../components/shared/Navbar/Navbar';
import Home from '../components/pages/Home/Home';
import Teams from '../components/pages/Teams/Teams';
// import NewTeam from '../components/pages/NewTeam/NewTeam';
import Admin from '../components/pages/Admin/Admin';
import CurrentGame from '../components/pages/CurrentGame/CurrentGame';
import AvailablePlayers from '../components/pages/AvailablePlayers/AvailablePlayers';
// import AddTeam from '../components/pages/NewTeam/AddTeam';
import Test from '../components/pages/NewTeam/Test/Test';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/teams" exact component={Teams} />
          <Route path="/teams/new" exact component={Test} />
          <Route path="/adminportal" exact component={Admin} />
          <Route path="/currentgame" exact component={CurrentGame} />
          <Route path="/availableplayers" exact component={AvailablePlayers} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
