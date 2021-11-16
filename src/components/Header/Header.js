import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { SportsSoccer } from '@material-ui/icons';

function Header() {
    return (
        <div className="header">
            <div className="brand">
                <Link to="/">
                    S<SportsSoccer />occer App
                </Link>
            </div>
        </div>
    )
}

export default Header;
