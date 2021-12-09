import React from 'react';
import './Squad.css';

function SquadOpt({res, className1, className2, abbr}) {
    return (
        <>
            {res.map(player => (
                <div className={className1} key={player.id}>
                    <div className={className2} style={{backgroundImage: `url(${player.photo})`}}>
                        <div className="squad__player__info">
                            <p> { player.name } </p>
                            <p>{abbr} No. { player.number } </p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default SquadOpt
