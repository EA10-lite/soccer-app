import React from 'react';
import './League.css';
import { Link } from 'react-router-dom';
import Standings from '../Standings/Standings';
import useFetch from '../../useFetch';
import { useParams } from 'react-router-dom';
import TopScorer from './TopScorer';
import TopAssist from './TopAssist';
// import LeagueFixture from '../LeagueFixture/LeagueFixture'

function League() {

    const {id}= useParams()
    const {data: clubData} = useFetch(`https://api-football-v1.p.rapidapi.com/v3/teams?league=${id}&season=2021`)
    const {data: leagueData} = useFetch(`https://api-football-v1.p.rapidapi.com/v3/leagues?id=${id}`)
    const { data: standings} = useFetch(`https://api-football-v1.p.rapidapi.com/v3/standings?league=${id}&season=2021`)
    // const { data: fixtures } = useFetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${id}&next=1`)
    
    return (
        <div className="league__details">
            <div className="clubs">
                {clubData && clubData.map(item=>(
                     <Link to={`/club/${item.team.id}`} className="brand__club" key={item.team.id}>
                        <img src={`${item.team.logo}`} alt={`${item.team.name}`} />
                    </Link>
                ))}
            </div>
            {leagueData && (
                <>
                    <div className="club__league__header">
                        <img src={`${leagueData[0].league.logo}`} alt={`${leagueData[0].league.name}`} />
                        <h1>{leagueData[0].league.name}</h1>
                    </div>
                </>
            )}
            <div className="league__info">
                <div className="league-fixtures">
                    {/* <Fixture fixtures={fixtures} /> */}
                </div>
                <div className="league__statistics">
                    <div className="top__goals">
                        <TopScorer id={id}/>
                    </div>
                    <div className="top__assist">
                        <TopAssist id={id}/>
                    </div>
                </div>
                <div className="league__standings">
                    {standings && standings[0] && standings[0].league.standings.map((standing,i)=>(
                        <Standings standings={standing}key={i} />
                    ))}
                </div>
            </div>
            {/* clubs  teams?league=39&season=2019*/}
            {/* top yellow cards -- players/topyellowcards?season=2020&league=61 */}
            {/* top red cards -- players/topredcards?season=2020&league=61 */}

        </div>
    )
}

export default League;
