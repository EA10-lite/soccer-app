import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { Menu, SportsSoccer } from '@material-ui/icons';
import { connect } from 'react-redux';
import { Avatar } from '@material-ui/core';

function Header({firebase, handleOpen }) {
    return (
        <div className="header">
            <div className="header__container">
                <div className="brand">
                    <Menu className="menu__svg" onClick={handleOpen} />
                    <Link to="/">
                        S<SportsSoccer />occer App
                    </Link>
                </div>
                <div className="auth">
                    {firebase && firebase.auth.isEmpty ? (
                        <Link to="/login" className="__login">
                            Log in
                        </Link> 
                    ): (
                        <>
                        <div className="user">
                            <Avatar className="avatar"> 
                                {firebase.auth.displayName && firebase.auth.displayName[0]}
                            </Avatar>
                            <p> { firebase.auth.displayName ? firebase.auth.displayName : firebase.auth.email} </p>
                        </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state)=> {
    return state
}

export default connect(mapStateToProps)(Header);
