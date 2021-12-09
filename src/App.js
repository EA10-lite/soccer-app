import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
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
import Sidebar from './components/Sidebar/Sidebar';
import Club from './components/club-data/club/Club';
import EditProfile from './components/edit-profile/EditProfile';

function App() {
  const  [width, setWidth] = useState(0);
  const handleOpen = ()=> {
    setWidth(250)
  }
  const handleClose = ()=> {
    setWidth(0)
  }
  const handleIdChange = (e)=>{
    const btns = document.querySelectorAll('.bottom__nav a');
    for (let i=0;i<btns.length;i++){
       btns[i].className = btns[i].className.replace('active','')
    }
    e.currentTarget.className = 'active'
}
  return (
    <div className="app">
      <BrowserRouter>
        <Header handleOpen={handleOpen} />
        <Sidebar handleClose={handleClose} width={width} />
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
            <Route path="/profile">
              <EditProfile />
            </Route>
            <Route path="/match/:id">
              <Match />
            </Route>
            <Route path="/league/:id">
              <League />
            </Route>
            <Route path="/club/:id">
              <Club />
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
          <Link to="/menu" onClick={e => handleIdChange(e)}>
            <MenuIcon />
            <p>Menu</p>
          </Link>
          <Link to="/" className="active"  onClick={e => handleIdChange(e)}>
            <SportsSoccerSharp />
            <p>Fixtures</p>
          </Link>
          <Link to="/live"  onClick={e => handleIdChange(e)}>
            <Timelapse />
            <p>Live</p>
          </Link>
          <Link to="/leaguestats"  onClick={e => handleIdChange(e)}>
            <BarChart />
            <p>Stats</p>
          </Link>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
