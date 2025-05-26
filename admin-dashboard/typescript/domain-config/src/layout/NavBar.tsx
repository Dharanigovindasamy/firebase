import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

interface NavItem {
    name: string;
    label: string;
    path: string;
}

const NavBar = () => {
    const location = useLocation();

    const navItems: NavItem[] = [
        {
            name: 'Admin',
            label: 'Admin',
            path: '/admin'
        },
        {
            name: 'Domain',
            label: 'Domain',
            path: '/domain'
        },
        {
            name: 'Device Configuration',
            label: 'Device Configuration',
            path: '/device-config'
        }
    ];

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <ul className="nav-list">
                    {navItems.map((item) => (
                        <li 
                            key={item.name}
                            className={`nav-item ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
                        >
                            <Link to={item.path}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;


