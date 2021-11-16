import React from 'react';
import './Stats.css';

const Stats = ({stats})=> {
    return (
        <div className="stats">
            {stats[0] ? (
            <>
            <div className="stats__title">
                <div className="home__title">
                    <img src={`${stats[0].team.logo}`} alt={`${stats[0].team.name}`} />
                </div>
                <div className="type__title">
                    <p>Match STATS</p>
                </div>
                <div className="away__title">
                    <img src={`${stats[1].team.logo}`} alt={`${stats[1].team.name}`} />
                </div>
            </div>
            <div className="stats__value">
                <div className="home__stats">
                    {stats[0].statistics.map((item,i)=> (
                        <p className="value" key={i}>{item.value === null ? 0 : item.value}</p>
                    ))}
                </div>
                <div className="type">
                    {stats[0].statistics.map((item,i)=> (
                        <p className="value"  key={i}>{item.type}</p>
                    ))}
                </div>
                <div className="away__stats">
                    {stats[1].statistics.map((item,i)=> (
                        <p className="value" key={i}>{item.value === null ? 0 : item.value}</p>
                    ))}
                </div>
            </div>
            </>
            ): (
                <div className="stats__title">
                    <p> NO MATCH STAT</p>
                </div>
            )}
        </div>
    )
}

export default Stats;