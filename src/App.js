import React from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Match from './components/Match/Match';
import Header from './components/Header/Header';
import Live from './components/Live/Live';
import Menu from './components/Menu/Menu';
import League from './components/League/League';
import Login from './components/authentication/Login';
import CreateAccount from './components/authentication/CreateAccount';
import { BarChart, Menu as MenuIcon, SportsSoccerSharp, Timelapse } from '@material-ui/icons';
import LeagueStats from './components/popular/LeagueStats';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <div className="app__body">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/live">
              <Live />
            </Route>
            <Route path="/menu">
              <Menu />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <CreateAccount />
            </Route>
            <Route path="/notifications">
            </Route>
            <Route path="/match/:id">
              <Match />
            </Route>
            <Route path="/league/:id">
              <League />
            </Route>
            <Route path="/club/:id">

            </Route>
            <Route path="/leaguestats">
              <LeagueStats />
            </Route>
          </Switch>
        </div>

        <div className="footer">
          <p>powered  by api-football</p>
        </div>
        <div className="bottom__nav">
          <NavLink to="/menu">
            <MenuIcon />
            <p>Menu</p>
          </NavLink>
          <NavLink to="/">
            <SportsSoccerSharp />
            <p>Fixtures</p>
          </NavLink>
          <NavLink to="/live">
            <Timelapse />
            <p>Live</p>
          </NavLink>
          <NavLink to="/leaguestats">
            <BarChart />
            <p>League Stats</p>
          </NavLink>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
