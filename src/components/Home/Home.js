import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useFetch from '../../useFetch';
import './Home.css';
import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu'
import { CalendarTodayOutlined } from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';

const Home = ()=>{
    const [ date, setDate ] = useState(new Date());
    const dayFormat = date.getDate() < 10 ? `0${ date.getDate() }` : date.getDate();
    const monthFormat = date.getMonth() + 1 < 10 ? `0${ date.getMonth() + 1}` : date.getMonth(); 
    const format = `${date.getFullYear()}-${monthFormat}-${dayFormat}`
    const {data, pending} = useFetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${format}`);
    
    const [openCalender, setOpenCalender] = useState(false);
    const handleOpenCalender = ()=> {
        setOpenCalender(!openCalender);
        closeCalender();
    }
    const closeCalender = ()=> {
        setTimeout(()=>{
            const btns = document.querySelectorAll(".calender button.react-calendar__tile")
            for(let btn of btns){
                btn.addEventListener('click',(e)=>{
                    setTimeout(() => {
                        setOpenCalender(false);
                    }, 1500);
                })
            }
        },1000)
    }

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
            <div className="calender__date">
                <div>
                    <div className="visit__live">
                        <Link to="/live">
                            LIVE
                        </Link>
                    </div>
                    <div className="selected__date">
                        <p> { date.toDateString() } </p>
                    </div>
                    <div className="calender__icon">
                        <CalendarTodayOutlined  onClick={handleOpenCalender}/>
                    </div>
                </div>
            </div>
            {openCalender && (
                <div className="calender__overlay">
                    <div className="calender__container">
                        <Calendar className="calender" onChange={setDate} value={date}  /> 
                    </div>
                </div>
            )}
            {pending && (
                <div className="pending__container">
                    <div className="pending__content">
                        <CircularProgress />
                        <p>Loading...</p>
                    </div>
                </div>
            )}
            <>
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
                                            <p>{result.fixture.status.elapsed === null && result.fixture.status.short === 'NS' ? convertToTime(result.fixture.timestamp) : result.fixture.status.elapsed !== null  && result.fixture.status.short !== 'FT' && result.fixture.status.short !== 'HT' ?  `${result.fixture.status.elapsed}'` : result.fixture.status.short} </p>
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
            </>
        </div>
    )
}

export default Home;
