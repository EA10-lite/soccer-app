import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from './useFetch';
import './Autocomplete.css';

const Autocomplete = ({searchInput, handleClose}) => {
    const  { data } = useFetch(`https://api-football-v1.p.rapidapi.com/v3/teams?search=${searchInput}`);
    return (
       <div>
           {data && data.slice(0,7).map(item=> (
               <Link key={item.team.id} to={`/club/${item.team.id}`} className='dropdown__content' onClick={handleClose}>
                    <img src={item.team.logo} alt={item.team.name} />
                    {item.team.name}
               </Link>
           ))}
       </div>
    )
}
export default Autocomplete;
