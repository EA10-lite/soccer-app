import React from 'react';
import './Lineups.css';

function Lineups({lineups}) {
    return (
        <div className="lineups">
            {lineups[0] ? (
            <>
            <div className="startxi">
                <div className="lineups__title">
                    <img src={`${lineups[0].team.logo}`} alt={`${lineups[0].team.name}`} />
                    <p>STARTXI</p>
                    <img src={`${lineups[1].team.logo}`} alt={`${lineups[1].team.name}`} />
                </div>
                <div className="details">
                    <div className="home__startxi">
                        {lineups[0].startXI.map(item=>(
                            <div className="player"  key={item.player.id}>
                                <p className="number">{item.player.number}</p>
                                <p className="name">{item.player.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="away__startxi">
                        {lineups[1].startXI.map(item=>(
                            <div className="player"  key={item.player.id}>
                                <p className="name">{item.player.name}</p>
                                <p className="number">{item.player.number}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="substitute">
                <div className="lineups__title">
                    <img src={`${lineups[0].team.logo}`} alt={`${lineups[0].team.name}`} />
                    <p>SUBSTITUTES</p>
                    <img src={`${lineups[1].team.logo}`} alt={`${lineups[1].team.name}`} />
                </div>
                <div className="details">
                    <div className="home__sub">
                        {lineups[0].substitutes.map(item=>(
                            <div className="player" key={item.player.id}>
                                <p className="number">{item.player.number}</p>
                                <p className="name">{item.player.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="away__sub">
                        {lineups[1].substitutes.map(item=>(
                            <div className="player"  key={item.player.id}>
                                <p className="name">{item.player.name}</p>
                                <p className="number">{item.player.number}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="manager">
                <div className="lineups__title">
                    <img src={`${lineups[0].team.logo}`} alt={`${lineups[0].team.name}`} />
                    <p>MANAGER</p>
                    <img src={`${lineups[1].team.logo}`} alt={`${lineups[1].team.name}`} />
                </div>
                <div className="details">
                    <div className="home__manager">
                        <div className="coach">
                            <img src={`${lineups[0].coach.photo}`} alt={`${lineups[0].coach.name}`} />
                            <p>{lineups[0].coach.name}</p>
                        </div>
                    </div>
                    <div className="away__manager">
                        <div className="coach">
                            <p>{lineups[1].coach.name}</p>
                            <img src={`${lineups[1].coach.photo}`} alt={`${lineups[1].coach.name}`} />
                        </div>
                    </div>
                </div>
            </div>
            </>
            ): (
                <div className="startxi">
                    <div className="details">
                        <p>LINEUPS COMING SOON!!!</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Lineups;
