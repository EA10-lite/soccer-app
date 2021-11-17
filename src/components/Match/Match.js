import React, { useState } from 'react';
import './Match.css';
import useFetch from '../../useFetch';
import { useParams, Link} from 'react-router-dom';
import Standings from '../Standings/Standings';
import { ArrowRight } from '@material-ui/icons';
import Stats from './Stats';
import Lineups from './Lineups';
import MatchSummary from '../summary/MatchSummary';
import Predictions from './Predictions';

const Match = ()=>{
    const [display, setDisplay] = useState('Stats');
    const {id} = useParams();
    const matchId = id.split('&')[0].split('=')[1];
    const leagueId = id.split('&')[1].split('=')[1];
    const season = id.split('&')[2].split('=')[1];
    const homeId = id.split('&')[3].split('=')[1];
    const awayId = id.split('&')[4].split('=')[1];
    
    const { data : details} = useFetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${matchId}`);
    const { data : standings} = useFetch(`https://api-football-v1.p.rapidapi.com/v3/standings?league=${leagueId}&season=${season}`)
    const { data : predictions } = useFetch(`https://api-football-v1.p.rapidapi.com/v3/players?season=2021&league=2`);

    const filterEventsByGoal = details && details[0].events.filter(item=>{
        return item.type === 'Goal' ? item : null;
    })
    
    function convertToTime(d){
        var date = new Date(d * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var formattedTime = hours + ':' + minutes.substr(-2)

        return formattedTime;
    }
    function changeDisplay(e,title){
        setDisplay(title);
        const btns = document.querySelectorAll('.btn__navigations button');
        for (let i=0;i<btns.length;i++){
           btns[i].className = btns[i].className.replace('active','')
        }
        e.currentTarget.className = 'active'
    }
    return (
        <div className="match">
            <div className="title">
                {details && (
                    <div className="info">
                        <Link to={`/league/${details[0].league.id}`}>
                            <p>{details[0].league.country}</p>
                            <ArrowRight />
                            <img src={`${details[0].league.logo}`} alt={`${details && details[0].league.name}`} />
                            <p>{details[0].league.name}</p>
                        </Link>
                        <p>({details[0].league.round})</p>
                    </div>
                )}
            </div>
            <div className="league__match">
                {details && (
                <div className="match__details">
                    <>
                    <div className="league__match__fixtures">

                    </div>
                    <div className="match__header">
                        <div className="match__date">
                            {details[0].fixture.status.elapsed !== null && details[0].fixture.status.short !== 'FT' && details[0].fixture.status.short !== 'HT' ? (
                                <div className="ongoing">
                                    <p> { details[0].fixture.status.elapsed }' </p>
                                </div>
                            ) : (
                                <div className="fulltime">
                                    <p> { details[0].fixture.status.short }' </p>
                                </div>
                            )}
                            <div className="date">
                                <p>
                                    { details[0].fixture.date.split("T")[0]}
                                    <span>({ convertToTime(details[0].fixture.timestamp)})</span>
                                </p>
                            </div>
                        </div>
                        <div className="match__info">
                            <div className="match__home">
                                <img src={`${details[0].teams.home.logo}`} alt={`${details[0].teams.home.name}`} />
                                <p>{details[0].teams.home.name}</p>
                            </div>
                            <div className="scoreline">
                                {details[0].fixture.status.elapsed === null ? (
                                    <div className="match__not__started">
                                        <h3>VS</h3>
                                    </div>
                                ) : (
                                    <div className="match__score">
                                        <div className="match__home__score">
                                            <h2>{details[0].goals.home}</h2>
                                        </div>
                                        <div className="match__divider">
                                            <h2> - </h2>
                                        </div>
                                        <div className="match__away__score">
                                            <h2>{details[0].goals.away}</h2>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="match__away">
                                <img src={`${details[0].teams.away.logo}`} alt={`${details[0].teams.away.name}`} />
                                <p>{details[0].teams.away.name}</p>
                            </div>
                        </div>
                        <div className="match__events">
                            {details && filterEventsByGoal.map((item,i)=>(
                                <div className="events" key={i}>
                                    <div className="home__events">
                                        {item.team.id === parseInt(homeId) ? (
                                            <div className="scorer__details">
                                                <div className="goal__time">
                                                    <p> {item.time.elapsed}' </p>
                                                </div>
                                                <div className="goal">
                                                    <div>
                                                        <p>{item.player.name}</p>
                                                        {item.type === 'Goal' && item.detail === 'Own Goal' ? (
                                                        <p> (OG) </p>
                                                    ) : ''}
                                                    </div>
                                                    {item.assist.name? (
                                                        <div className="assist">
                                                            <p> assist. { item.assist.name} </p>
                                                        </div>
                                                    ): ''}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="empty"></div>
                                        )}
                                    </div>
                                    <div className="events__type__goal">
                                        <img src='https://cdn-icons-png.flaticon.com/128/3231/3231063.png' alt='goal' />
                                    </div>
                                    <div className="away__events">
                                        {item.team.id === parseInt(awayId) ? (
                                            <div className="scorer__details">
                                                <div className="goal">
                                                    <div>
                                                        <p>{item.player.name}</p>
                                                        {item.type === 'Goal' && item.detail === 'Own Goal' ? (
                                                        <p> (OG) </p>
                                                    ) : ''}
                                                    </div>
                                                    {item.assist.name? (
                                                        <div className="assist">
                                                            <p> assist. { item.assist.name} </p>
                                                        </div>
                                                    ): ''}
                                                </div>
                                                <div className="goal__time">
                                                    <p> {item.time.elapsed}' </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="empty"></div>
                                        )}
                                    </div>
                                  
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mobile__navigations">
                        <div className="btn__navigations">
                            <button onClick={(e)=> changeDisplay(e,'Stats')}> Stats </button>
                            <button onClick={(e)=> changeDisplay(e,'Summary')}> Summary </button>
                            <button onClick={(e)=> changeDisplay(e,'Lineups')}> Linueps </button>
                            <button onClick={(e)=> changeDisplay(e,'Standings')}> Standings </button>
                            <button onClick={(e)=> changeDisplay(e,'H2h')}> H2H </button>
                            <button onClick={(e)=> changeDisplay(e,'Predictions')}> Predictions </button>
                        </div>
                    </div>
                    <div className="other__details__mobile">
                        {display === 'Stats' ? (<Stats stats={details[0].statistics} /> ) : display === 'Lineups' ? (<Lineups lineups={details[0].lineups} />) : display === 'Standings' ? (
                            <div className="standings">
                                {(standings && standings.length > 0 ) && standings[0].league.standings.map((standing,i)=>(
                                    <Standings standings={standing} homeId={homeId} awayId={awayId} key={i} />
                                ))}
                        </div>
                        ) : display === 'Summary' ? (
                            <MatchSummary details={details} homeId={homeId} awayId={awayId} />
                        ) : display === 'Predictions' ? (
                            <Predictions predictions={predictions} />
                        ) : ''}
                    </div>
                    <div className="other__details">
                        {details  && <Stats stats={details[0].statistics} />} 
                        {details && <Lineups lineups={details[0].lineups} />}
                        {details && <MatchSummary details={details} homeId={homeId} awayId={awayId} />} 
                    </div>
                    </>
                </div>
                )}
                <div className="standings desktop__view">
                    {(standings && standings.length > 0 ) && standings[0].league.standings.map((standing,i)=>(
                        <Standings standings={standing} homeId={homeId} awayId={awayId} key={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Match;