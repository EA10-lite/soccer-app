import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Match from './components/Match/Match';
import Header from './components/Header/Header';
import Live from './components/Live/Live';
import Menu from './components/Menu/Menu';
import League from './components/League/League';
import { Menu as MenuIcon, SportsSoccerSharp, Timelapse } from '@material-ui/icons';

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
            <Route path="/match/:id">
              <Match />
            </Route>
            <Route path="/league/:id">
              <League />
            </Route>
          </Switch>
        </div>
        <div className="footer">
          <p>powered  by api-football</p>
        </div>
        <div className="bottom__nav">
          <Link to="/menu">
            <MenuIcon />
            <p>Menu</p>
          </Link>
          <Link to="/">
            <SportsSoccerSharp />
            <p>Fixtures</p>
          </Link>
          <Link to="/live">
            <Timelapse />
            <p>Live</p>
          </Link>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
