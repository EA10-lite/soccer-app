import React, { useState } from 'react';
import useFetch from '../../useFetch';
import './TopAssist.css';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import BasicModal from './PlayerData';

function TopAssist({id}) {
    const [playerId,setPlayerId] = useState(null)
    const [open, setOpen] = useState(false);
    const handleOpen = (id) => {
        setOpen(true);
        setPlayerId(id);
    }
    const handleClose = () => setOpen(false);
    const [count,setCount] = useState(10)

    const {data} = useFetch(`https://api-football-v1.p.rapidapi.com/v3/players/topassists?season=2021&league=${id}`);
    
    const showMore = ()=> {
        setCount(20)
        document.querySelector('.more').style.display = 'none';
        document.querySelector('.less').style.display = 'flex';
    }

    const ShowLess = ()=> {
        setCount(10)
        document.querySelector('.more').style.display = 'flex';
        document.querySelector('.less').style.display = 'none';
    }

    return (
        <>
            {data && (
                <div className="top__assist">
                    <div className="sub__title">
                        <p>TOP ASSISTS</p>
                        <p className="more"  onClick={showMore}> Show More <ArrowRight/></p>
                        <p className="less"  onClick={ShowLess}>Show Less <ArrowLeft /></p>
                    </div>
                    <table className="assist__table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Assists</th>
                                <th>Goals</th>
                                <th>Penalty</th>
                                <th>Apps</th>
                            </tr>
                        </thead>
                        <tbody>
                            { data.length ? data.slice(0,count).map(item=>(

                                <tr key={item.player.id} onClick={()=> handleOpen(item.player.id)}>
                                    <td className="assist__player__info">
                                        <ArrowRight />
                                    </td>
                                    <td className="scorer__info">
                                        <img src={`${item.statistics[0].team.logo}`} alt={`${item.statistics[0].team.name}`} />
                                        <p>{item.player.name}</p>
                                    </td>
                                    <td className="td__stats">{item.statistics[0].goals.assists}</td>
                                    <td className="td__stats">{item.statistics[0].goals.total}</td>
                                    <td className="td__stats">{item.statistics[0].penalty.scored}</td>
                                    <td className="td__stats">{item.statistics[0].games.appearences}</td>
                                </tr>
                            )) : (
                                <div className="empty">
                                    <p>NO DATA</p>
                                </div>
                            )}
                        </tbody>
                    </table>
                    
                    <BasicModal open={open} handleClose={handleClose} id={playerId} /> 
                </div>
            )}
        </>
    )
}

export default TopAssist
