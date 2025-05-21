import React from 'react';
import { useLocation } from 'react-router-dom';
import './SideBar.css';
import DeviceConfigNav from '../components/Sidebar/DeviceConfigNav';

const SideBar = () => {
    const location = useLocation();

    const renderContent = () => {
        if (location.pathname.startsWith('/device-config')) {
            return <DeviceConfigNav />;
        }
        
        switch (location.pathname) {
            case '/admin':
                return <h3>Admin Dashboard</h3>;
            case '/domain':
                return <h3>Domain Management</h3>;
            default:
                return <h3>Welcome to the dashboard</h3>;
        }
    };

    return (
        <aside className="sidebar">
            {renderContent()}
        </aside>
    );
};

export default SideBar;
