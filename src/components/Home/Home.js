import React from 'react';
import useFetch from '../../useFetch';
import './Home.css';
import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu'
const Home = ()=>{
    const d = new Date()
    const date = d.toISOString().split('T')[0];
    const {data} = useFetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?date=2021-11-06`)
    const sortedFixture = {};
    data?.reduce((initial,current)=> {
        if(!sortedFixture[current.league.id]){
            sortedFixture[`${current.league.id}`] = [current]
        }
        else {
            sortedFixture[`${current.league.id}`].push(current)
        }
        return initial
    },[])
    const league = [];
    for (let name in sortedFixture){
        if(sortedFixture){
            league.push({id: name, match: sortedFixture[name]})
        }
    }
    function convertToTime(d){
        var date = new Date(d * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var formattedTime = hours + ':' + minutes.substr(-2)

        return formattedTime;
    }

    return (
        <div className="home">
            <div className="home__header">
            </div>
            <div className="home__body">
                <div className="menu">
                    <Menu />
                </div>
            <div className="fixtures">
                {league !== [] && league.map((item)=> (
                <div className="fixture" key={item.id}>
                    <div className="fixture__header">
                        <div className="info">
                            <Link to={`/league/${item.id}`}>
                                <img src={`${item.match[0].league.logo}`} alt="" />
                                <p className="league__name">{item.match[0].league.name}</p>
                            </Link>
                        </div>
                        <div className="round">
                            <p>{item.match[0].league.round}</p>
                        </div>
                    </div>
                    {item.match.map(result => (
                        <div className="fixture__body" key={result.fixture.id}>
                            <Link to={`/match/match=${result.fixture.id}&league=${item.id}&season=${item.match[0].league.season}&home=${result.teams.home.id}&away=${result.teams.away.id}`}>
                                <div className="fixture__details">
                                    <div className="fixture__time">
                                        <p>{result.fixture.status.elapsed === null && result.fixture.status.short === 'NS' ? convertToTime(result.fixture.timestamp) : result.fixture.status.elapsed !== null  && result.fixture.status.short !== 'FT' ?  result.fixture.status.elapsed : result.fixture.status.short}</p>
                                    </div>
                                    <div className="fixture__menu">
                                        <div className="fixture__home">
                                            <p>{result.teams.home.name}</p>
                                            <img src={`${result.teams.home.logo}`} alt={`${result.teams.home.name}`} />
                                        </div>
                                        <div className="fixture__scoreline">
                                            <div className="score">
                                                <div className="home__score">
                                                    <p>{result.fixture.status.elapsed !== null ?  result.goals.home : '' }</p>
                                                </div>
                                                <div className="divider">
                                                    <p>{result.fixture.status.elapsed !== null ? ' - ' : 'VS' }</p>
                                                </div>
                                                <div className="away__score">
                                                    <p>{result.fixture.status.elapsed !== null ? result.goals.away : ''}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="fixture__away">
                                            <img src={`${result.teams.away.logo}`} alt={`${result.teams.away.name}`} />
                                            <p>{result.teams.away.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                ))}
            </div>
            </div>
        </div>
    )
}

export default Home;