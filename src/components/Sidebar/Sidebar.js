import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { ArrowRightAlt, CancelOutlined, Edit, Search } from '@material-ui/icons';
import { connect } from 'react-redux';
import { logoutActions } from '../../store/actions/authActions';
import { Avatar } from '@material-ui/core';
import Autocomplete from '../../Autocomplete';

const Sidebar = ({firebase,logout, width, handleClose})=> {
    const [ searchInput, setSearchInput ] = useState('');
    const { auth } = firebase;
    const handleClick = ()=> {
        logout();
    }
    const handleChange = (e)=> {
        setSearchInput(e.target.value);   
    }
    const handleSubmit = (e)=> {
        e.preventDefault()
    }
    return (
        <div className={width > 0 ? "__container" : ''}>
            <div className="sidebar" style={{width: `${width}px`}}>
                <div className="close__btn">
                    <CancelOutlined onClick={handleClose} />
                </div>
                <div className="sidebar__container">
                    <div className="user__field">
                        {auth.isEmpty ? (
                            <div className="no__user">
                                <h3> No Active User</h3>
                                <Avatar className='user__avatar' />
                            </div>
                        )   : 
                            <div className="profile">
                                <Avatar className='user__avatar' src={'https://media.api-sports.io/football/venues/556.png'} />
                                    {/* {auth.displayName && auth.displayName[0]}
                                </Avatar> */}
                                <p> {auth.displayName && auth.displayName} </p>
                                <h3> {auth.email} </h3>
                                <Link to="/profile" onClick={handleClose}> <Edit /> Edit Profile </Link>
                            </div>
                        }
                    </div>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className="input__field">
                            <input type="text" placeholder="search  club" required value={searchInput} onChange={(e)=> handleChange(e)} />
                            <Search />
                        </div>
                    </form>
                    {searchInput.length >= 5 && (
                        <div className="club__dropdown">
                            <Autocomplete searchInput={searchInput} handleClose={handleClose} />
                        </div>
                    )}
                    <div className="settings__field"></div>
                    <div className="auth__field">
                        {auth.isEmpty ? (<Link to="/login"> Log in </Link> ) : (
                            <button onClick={handleClick}> Logout <ArrowRightAlt /> </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state)=> {
    return state;
}
const mapDispatchToProps = (dispatch)=>{
    return {
        logout : ()=> dispatch(logoutActions())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);