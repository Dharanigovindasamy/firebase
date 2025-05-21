import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DeviceConfigNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('basic-details');

  const tabs = useMemo(() => [
    { id: 'basic-details', label: 'Basic Details', path: '/device-config/basic-details' },
    { id: 'device-configuration', label: 'Device Configuration', path: '/device-config/device-configuration' },
    { id: 'advanced-configuration', label: 'Advanced Configuration', path: '/device-config/advanced-configuration' }
  ], []);

  useEffect(() => {
    const currentPath = location.pathname;
    const currentTab = tabs.find(tab => currentPath.includes(tab.id));
    if (currentTab) {
      setActiveTab(currentTab.id);
    }
  }, [location.pathname, tabs]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      navigate(tab.path);
    }
  };

  return (
    <div className="device-config-nav">
      <h3>Device Configuration</h3>
      <nav className="device-config-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default DeviceConfigNav; 