import React from 'react';
import './Menu.css';
import useFetch from '../../useFetch';
import { Link } from 'react-router-dom';
import { ArrowDropDown } from '@material-ui/icons';

function Menu() {
    const { data } = useFetch('https://api-football-v1.p.rapidapi.com/v3/leagues?season=2021');
    const sortedLeague = {};
    data?.reduce((initial,current)=> {
        if(!sortedLeague[current.country.name]){
            sortedLeague[`${current.country.name}`] = [current]
        }
        else {
            sortedLeague[`${current.country.name}`].push(current)
        }
        return initial
    },[])

    const menu = [];
    for (let name in sortedLeague){
        if(sortedLeague){
           menu.push({id: name, countryLeague: sortedLeague[name]})
        }
    }

    const handleClick = (i)=>{
        document.querySelectorAll('.dropdown')[i].classList.toggle('hidden')
    }

    return (
        <div className="menu">
            {menu !== [] && menu.map((item, i)=>(
                <div className="menu__details" key={item.id}>
                    <div className="league__header">
                        <div className="country__info">
                            <img src={`${item.countryLeague[0].country.flag}`} alt='' />
                            <p>{item.id}</p>
                        </div>
                        <ArrowDropDown onClick={()=> handleClick(i)} />
                    </div>
                    <div className="dropdown hidden">
                        {item.countryLeague.map(res=>(
                            <Link to={`/league/${res.league.id}`} className="dropdown__item" key={res.league.id}>
                                <img src={`${res.league.logo}`} alt='' />
                                <p>{res.league.name}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Menu;
