import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li>
                    <Link to="/admin" className="nav-link">
                        Admin
                    </Link>
                </li>
                <li>
                    <Link to="/domain" className="nav-link">
                        Domain
                    </Link>
                </li>
                <li>
                    <Link to="/device-config" className="nav-link">
                        Device Configuration
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;