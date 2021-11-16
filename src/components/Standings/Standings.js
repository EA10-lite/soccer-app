import React from 'react';
import './Standings.css';

function Standings({standings, homeId,awayId}) {
    
    return (
        <div className="standings">
            {standings[0].group? (
                <p className="group">{standings[0].group}</p>
            ) : null}
            <table className="table__standings">
                <thead className="table__header">
                    <tr>
                        <th><p>Club</p></th>
                        <th><p>MP</p></th>
                        <th><p>W</p></th>
                        <th><p>D</p></th>
                        <th><p>L</p></th>
                        <th><p>GD</p></th>
                        <th><p>Pts</p></th>
                    </tr>
                </thead>
                {standings.map(item=> (
                    <tbody className= {`table__body ${(item.team.id === homeId || item.team.id === `${awayId}` ) ? 'active' : 'not__active'}`} key={item.rank}>
                        <tr>
                            <td className="club__info">
                                <p>{item.rank}</p>
                                <img src={`${item.team.logo}`} alt='' />
                                <p>{item.team.name} </p>
                            </td>
                            <td><p>{item.all.played}</p></td>
                            <td><p>{item.all.win}</p></td>
                            <td><p>{item.all.draw}</p></td>
                            <td><p>{item.all.lose}</p></td>
                            <td><p>{item.goalsDiff}</p></td>
                            <td><p>{item.points}</p></td>
                        </tr>
                    </tbody>
                ))}
            </table>
        </div>
    )
}

export default Standings;
