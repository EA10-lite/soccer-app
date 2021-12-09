import React from 'react';
import './Fixture.css';
import { Link } from 'react-router-dom';

const Fixture = ({fixture}) => {
    const splitDate = (date)=> {
        return date.split('T')[0]
    }
    const sortedFixture = {}
    fixture?.reduce((initial,current)=>{
        if(!sortedFixture[splitDate(current.fixture.date)]){
            sortedFixture[splitDate(current.fixture.date)] = [current]
        } else {
            sortedFixture[splitDate(current.fixture.date)].push(current)
        }
        return initial
    },[])
    const newFixture = []
    for(let date in sortedFixture) {
        if(sortedFixture){
            newFixture.push({date, fixture: sortedFixture[date]})
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
        <>
            { newFixture && newFixture.map(result => (
                <div className="club__fixtures" key={result.date}>
                    <div className="club__fixture__header">
                        <p>{result.date}</p>
                    </div>
                    {result.fixture.map(match=> (
                        <div className="fixture__body" key={match.fixture.id}>
                            <Link to={`/match/macth=${match.fixture.id}&league=${match.league.id}&season=${match.league.season}&home=${match.teams.home.id}&away=${match.teams.away.id}`}>
                                <div className="fixture__details">
                                    <div className="fixture__time">
                                        <p>{match.fixture.status.elapsed === null && match.fixture.status.short === 'NS' ? convertToTime(match.fixture.timestamp) : match.fixture.status.elapsed !== null  && match.fixture.status.short !== 'FT' && match.fixture.status.short !== 'HT' ?  `${match.fixture.status.elapsed}'` : match.fixture.status.short} </p>
                                    </div>
                                    <div className="fixture__menu">
                                        <div className="fixture__home">
                                            <p>{match.teams.home.name}</p>
                                            <img src={`${match.teams.home.logo}`} alt={`${match.teams.home.name}`} />
                                        </div>
                                        <div className="fixture__scoreline">
                                            <div className="score">
                                                <div className="home__score">
                                                    <p>{match.fixture.status.elapsed !== null ?  match.goals.home : '' }</p>
                                                </div>
                                                <div className="divider">
                                                    <p>{match.fixture.status.elapsed !== null ? ' - ' : 'VS' }</p>
                                                </div>
                                                <div className="away__score">
                                                    <p>{match.fixture.status.elapsed !== null ? match.goals.away : ''}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="fixture__away">
                                            <img src={`${match.teams.away.logo}`} alt={`${match.teams.away.name}`} />
                                            <p>{match.teams.away.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ))}
        </>
    )
}

export default Fixture;