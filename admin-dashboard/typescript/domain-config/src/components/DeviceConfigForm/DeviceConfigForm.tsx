import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import '../styles/DeviceConfigForm.css';

const DeviceConfigForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('basic-details');

  const tabs = [
    { id: 'basic-details', label: 'Basic Details' },
    { id: 'network-settings', label: 'Network Settings' },
    { id: 'security-settings', label: 'Security Settings' },
    { id: 'advanced-settings', label: 'Advanced Settings' }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    navigate(`/device-config/${tabId}`);
  };

  return (
    <div className="device-config-form">
      <div className="device-config-header">
        <h2>Device Configuration</h2>
      </div>
      <div className="device-config-content">
        <div className="tab-navigation">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="form-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DeviceConfigForm;