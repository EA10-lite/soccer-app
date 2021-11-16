import React from 'react';
import './MatchSummary.css';

const MatchSummary = ({details, homeId, awayId})=> {
    return (
        <div className="match__summary">
            <div className="summary__title">
                <div className="home__title">
                    <img src={`${details[0].teams.home.logo}`} alt={`${details[0].teams.home.name}`} />
                </div>
                <div className="type__title">
                    <p>Match SUMMARY</p>
                </div>
                <div className="away__title">
                    <img src={`${details[0].teams.away.logo}`} alt={`${details[0].teams.away.name}`}/>
                </div>
            </div>
            {details[0].events.map((event, i)=>(
                <div className="summary__events" key={i}>
                    <div className="home__summary__events">
                        {event.team.id === parseInt(homeId) ?  (
                            <div className="summary__details">
                                <div className="time__elapsed">
                                    <p> {event.time.extra === null ? event.time.elapsed : event.time.extra + event.time.elapsed }' </p>
                                </div>
                                {event.type === 'subst' ? (
                                    <div className="summary__player__details">
                                        <p>Out { event.player.name } </p>
                                        <div className="assist">
                                            <p> In { event.assist.name } </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="summary__player__details">
                                        <p> { event.player.name } </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="empty"></div>
                        )}
                    </div>
                    <div className="summary__events__type">
                        {event.type === 'Goal'? (
                            <img src='https://cdn-icons-png.flaticon.com/128/3231/3231063.png' alt='goal' />
                        ) : event.type === 'subst' ? (
                            <img src='https://icon-library.com/images/substitute-icon/substitute-icon-24.jpg' alt='substitution' />
                        ) : event.type === 'Card' ? (
                            <div className={event.detail === 'Yellow Card' ? 'yellow__card' : 'red__card'}>
                            </div>
                        ) : event.type === 'Var'? (
                            <img src='' alt='' />
                        ) : null }
                    </div>
                    <div className="away__summary__events">
                        {event.team.id === parseInt(awayId) ?  (
                            <div className="summary__details">
                                {event.type === 'subst' ? (
                                    <div className="summary__player__details">
                                        <p>Out { event.player.name } </p>
                                        <div className="assist">
                                            <p>In { event.assist.name } </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="summary__player__details">
                                        <p> { event.player.name } </p>
                                    </div>
                                )}
                                <div className="time__elapsed">
                                    <p> {event.time.extra === null ? event.time.elapsed : event.time.extra + event.time.elapsed }' </p>
                                </div>
                            </div>
                        ) : (
                            <div className="empty"></div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MatchSummary;