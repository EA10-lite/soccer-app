import React from 'react';
import './LeagueFixture.css';
// import { Link } from 'react-router-dom';

function LeagueFixture({fixtures}) {
    console.log(fixtures);

    return (
        <div className='league__fixture'>
            <div className="league__header"></div>
            {/* {fixtures && fixtures.map(item => (
                <div className="league__fixture__body" key={item.fixture.id}>
                    <Link to="/">
                    <div className="home__side">
                        <div className="home__info">
                            <img src={`${item.teams.home.logo}`} alt='' />
                            <p>{item.teams.home.name}</p>
                        </div>
                        <div className="home__score">
                            <p>{item.goals.home }</p>
                        </div>
                    </div>
                    <div className="away__side">
                        <div className="away__info">
                            <img src={`${item.teams.away.logo}`} alt='' />
                            <p>{item.teams.away.name}</p>
                        </div>
                        <div className="away__score">
                            {item.goals.away}
                        </div>
                    </div>
                    </Link>
                </div>
            ))} */}
        </div>
    )
}

export default LeagueFixture;
