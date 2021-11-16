import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import React, {useState} from 'react';
import './TopScorer.css';
import useFetch from '../../useFetch';
import BasicModal from './PlayerData';

function TopScorer({id}) {
    const [playerId,setPlayerId] = useState(null);
    const [count,setCount] = useState(10)
    const [open, setOpen] = useState(false);
    const handleOpen = (id) => {
        setOpen(true)
        setPlayerId(id)
    };
    const handleClose = () => setOpen(false);
    const {data: topScorer} = useFetch(`https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${id}&season=2021`)

    const showMore = ()=> {
        setCount()
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
        {topScorer && (
        <div className="top__scorer">
            <div className="sub__title">
                <p>TOP SCORERS</p>
                <p className="more"  onClick={showMore}> Show More <ArrowRight/></p>
                <p className="less"  onClick={ShowLess}>Show Less <ArrowLeft /></p>
            </div>
            <table className="scorer__table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Goals</th>
                        <th>Penalty</th>
                        <th>Assists</th>
                        <th>Apps</th>
                    </tr>
                </thead>
                <tbody>
                    {topScorer.slice(0,count).map(item=>(
                        <tr key={item.player.id} onClick={()=> handleOpen(item.player.id)}>
                            <td className="scorer__player__info"> <ArrowRight /> </td>
                            <td className="scorer__info">
                                <img src={`${item.statistics[0].team.logo}`} alt={`${item.statistics[0].team.name}`} />
                                <p>{item.player.name}</p>
                            </td>
                            <td className="td__stats">{item.statistics[0].goals.total}</td>
                            <td className="td__stats">{item.statistics[0].penalty.scored}</td>
                            <td className="td__stats">{item.statistics[0].goals.assists !== null ? item.statistics[0].goals.assists : 0}</td>
                            <td className="td__stats">{item.statistics[0].games.appearences}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <BasicModal open={open} handleClose={handleClose} id={playerId} /> 
        </div>
        )}
        </>
    )
}

export default TopScorer;
