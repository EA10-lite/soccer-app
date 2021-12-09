import React, { useState, useEffect} from 'react';
import './Club.css';
import { useParams , withRouter} from 'react-router-dom';
import useFetch from '../../../useFetch';
import { ArrowRightAlt, CheckBox, StarOutline } from '@material-ui/icons';
import { connect } from 'react-redux';
import Squad from '../squad/Squad';
import Fixture from '../../fixture/Fixture';
import { followClub, getFirestoreData} from '../../../store/actions/storingActions';

function Club(props) {
    const { firebase, followCurrentClub, following, getDocuments} = props;
    console.log(props);
    const [ title , setTitle ] = useState('Fixtures');
    const { id } = useParams();
    const { data: clubInfo } = useFetch(`https://api-football-v1.p.rapidapi.com/v3/teams?id=${id}`);
    const { data: squad } = useFetch(`https://api-football-v1.p.rapidapi.com/v3/players/squads?team=${id}`)
    const { data: fixture } = useFetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?team=${id}&season=2021`);

    const handleTitleChange = (e, title)=>{
        setTitle(title)
        const btns = document.querySelectorAll('.tabs button');
        for (let i=0;i<btns.length;i++){
           btns[i].className = btns[i].className.replace('active','')
        }
        e.currentTarget.className = 'active'
    }
    const handleFollow = (details)=> {
        if(firebase.auth.uid) {
            followCurrentClub(details);
        } else {
            props.history.push('/login');
        }
    }

    useEffect(() => {
        if(firebase.auth.uid && clubInfo){
            getDocuments(clubInfo[0].team.id)
        }
    },[firebase.auth, clubInfo, getDocuments])

    return (
        <div className="club__data">
            <div className="club__data__info">
                {clubInfo && (
                    <div className="bg" style={{backgroundImage: `url(${clubInfo[0].venue.image})`}}>
                        <div className="bg__content">
                            <div className="club__details">
                                <div>
                                    <img src={`${clubInfo[0].team.logo}`} alt='' />
                                    <h2> { clubInfo[0].team.name} </h2>
                                </div>
                                <div className="founded">
                                    <p> since { clubInfo[0].team.founded} </p>
                                </div>
                            </div>
                            <div className="follow__club">
                                {following && firebase.auth.uid? (
                                    <button>
                                        <p> Following </p>
                                        <CheckBox />
                                    </button>
                                ):(
                                    <button onClick={()=> handleFollow({name: clubInfo[0].team.name, id: clubInfo[0].team.id, logo: clubInfo[0].team.logo })}>
                                        <StarOutline />
                                        <p> Follow </p>
                                    </button>
                                )}
                            </div>
                            <div className="address"> 
                                {clubInfo[0].venue.name} <ArrowRightAlt />  { clubInfo[0].venue.address } 
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="tabs">
                <button className="active" onClick={(e)=> handleTitleChange(e,'Fixtures')}>Fixtures</button>
                <button onClick={(e)=> handleTitleChange(e,'Squad')}>Squad</button>
            </div>
            <div className="club__stats">
                { title === 'Squad' ? (<Squad squad={squad} />) : title === 'Fixtures' ? (
                    <div className="club__fx">
                        <Fixture fixture={fixture} />
                    </div>
                ) : null }
                {/* standings */}
                {/* Transfer */}
                {/* Injury */}
            </div>
        </div>
    )
}
const mapStateToProps = (state)=> {
    return {
        following:state.store.following,
        firebase:state.firebase,
    }
}
const mapDispatchToProps = (dispatch)=> {
    return {
        followCurrentClub : (details) => dispatch(followClub(details)),
        getDocuments : (id)=> dispatch(getFirestoreData(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Club));

