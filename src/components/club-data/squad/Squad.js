import React from 'react';
import './Squad.css';
import SquadOpt from './SquadOpt';

const Squad = ({squad})=> {
    const groupSquad = (arr, pos, className1, className2, abbr) => {
        const res = arr?.filter(item=> {return item.position === pos})
        return <SquadOpt res={res} abbr={abbr} className1={className1} className2={className2} />
    }
    
    return (
        <div className="squad">
            {squad && squad.length > 0 ? (
                
                <div className="squad__container">
                    <div className="squad__gk">
                        <h3 className="pos__title"> GoalKeepers </h3>
                        <div className="gk">
                            {groupSquad(squad[0].players, 'Goalkeeper', 'gk__container', 'gk__details', 'Gk')} 
                        </div>
                    </div>
                    <div className="squad__df">
                        <h3 className="pos__title"> Defenders </h3>
                        <div className="df">
                            {groupSquad(squad[0].players, 'Defender', 'df__container', 'df__details', 'DF') }
                        </div>
                    </div>
                    <div className="squad__md">
                        <h3 className="pos__title"> Midfielders </h3>
                        <div className="md">
                            { groupSquad(squad[0].players, 'Midfielder', 'md__container', 'md__details', 'MD')}
                        </div>
                    </div>
                    <div className="sqaud__fw">
                        <h3 className="pos__title"> Forwards </h3>
                        <div className="fw">
                            {groupSquad(squad[0].players, 'Attacker', 'fw__container', 'fw__details', 'FW')}
                        </div>
                    </div>
                </div>
            ): (
                <div className="empty">
                    <p> Team Squad not available</p>
                </div>
            )}
        </div>
    )
}

export default Squad;