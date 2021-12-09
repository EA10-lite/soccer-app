import React, { useState } from 'react';
import './LeagueStats.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import useFetch from '../../useFetch';
import TopAssist from '../League/TopAssist';
import TopScorer from '../League/TopScorer';
import Standings from '../Standings/Standings';
import Fixture from '../fixture/Fixture';

function LeagueStats({popularLeagues}) {
    const [ leagueId, setLeagueId ] = useState(popularLeagues[0].id); 
    const [ title , setTitle ] = useState('Standings');
    const { data: standings} = useFetch(`https://api-football-v1.p.rapidapi.com/v3/standings?league=${leagueId}&season=2021`);
    const { data: fixture } = useFetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${leagueId}&season=2021`);
    
    const handleIdChange = (e,id)=>{
        setLeagueId(id)
        const btns = document.querySelectorAll('.league__container > div');
        for (let i=0;i<btns.length;i++){
           btns[i].className = btns[i].className.replace('active','')
        }
        e.currentTarget.className = 'active__league'
    }
    const handleTitleChange = (e, title)=>{
        setTitle(title)
        const btns = document.querySelectorAll('.tabs button');
        for (let i=0;i<btns.length;i++){
           btns[i].className = btns[i].className.replace('active','')
        }
        e.currentTarget.className = 'active'
    }
    return (
        <div className="league__stats">
            <div className="league__stats__header">
                <div className='league__container'>
                    {popularLeagues.map((league,i)=>(
                        <div className={i === 0? "active__league" : ''} key={league.id} onClick={(e)=> handleIdChange(e,league.id)} >
                            <p> { league.name } </p>
                        </div>
                    ))}
                </div>
                <div className="season">
                    <h3>Season 2021 </h3>
                </div>
                <div className="tabs">
                    <button onClick={(e)=> handleTitleChange(e,'Standings')}className="active">Standings</button>
                    <button onClick={(e)=> handleTitleChange(e,'Fixtures')}>Fixtures</button>
                    <button onClick={(e)=> handleTitleChange(e,'Goals')}>Goals</button>
                    <button onClick={(e)=> handleTitleChange(e,'Assists')}>Assists</button>
                </div>
            </div>
            <div className="content__display">
               <h3>{ title }</h3>
                { title === 'Standings' ? (
                    <div>
                        {standings && standings[0] && standings[0].league.standings.map((standing,i)=>(
                            <Standings standings={standing} key={i} />
                        ))}
                    </div>
                ) : title === 'Goals' ? (
                    <TopScorer id={leagueId} />
                ) : title === 'Assists' ? (
                    <TopAssist id={leagueId} />
                ) : title ==='Players' ? (
                    <div></div>
                ) : (
                    <div className="fixtures">
                        <Fixture fixture={fixture} />
                    </div>
                )}
            </div>
        </div>
    )
}
const mapStateToProps = (state)=>{
    return {
        popularLeagues : state.league.league
    }
}

export default connect(mapStateToProps)(withRouter(LeagueStats));
