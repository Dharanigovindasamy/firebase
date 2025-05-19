import React from 'react';
import { useLocation } from 'react-router-dom';
import './SideBar.css';

const SideBar: React.FC = () => {
    const location = useLocation();

    const renderContent = () => {
        switch (location.pathname) {
            case '/admin':
                return <h2>Admin Dashboard</h2>;
            case '/domain':
                return <h2>Domain Management</h2>;
            case '/device-config':
                return <h2>Device Configuration</h2>;
            default:
                return <h2>Welcome</h2>;
        }
    };

    return (
        <aside className="sidebar">
            {renderContent()}
        </aside>
    );
};

export default SideBar;
