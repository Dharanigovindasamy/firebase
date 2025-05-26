import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BasicDetails from './tabs/BasicDetails';
import DeviceConfigurationForm from './tabs/DeviceConfigurationForm';
import AdvancedConfiguration from './tabs/AdvancedConfiguration';
import './DeviceConfigLayout.css';
import useBasicDetailsStore from '../../store/basicDetailsStore';

const DeviceConfigLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('basic');
  const { deviceType } = useBasicDetailsStore();
  const deviceTypeLower = deviceType?.toLowerCase();
  const showAdvancedTab = deviceTypeLower !== 'dect' && deviceTypeLower !== 'standarddevice';

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    switch (path) {
      case 'basic-details':
        setActiveTab('basic');
        break;
      case 'device-configuration':
        setActiveTab('device');
        break;
      case 'advanced-configuration':
        setActiveTab('advanced');
        break;
      default:
        setActiveTab('basic');
        navigate('/device-config/basic-details');
        break;
    }
  }, [location.pathname, navigate]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case 'basic':
        navigate('/device-config/basic-details');
        break;
      case 'device':
        navigate('/device-config/device-configuration');
        break;
      case 'advanced':
        navigate('/device-config/advanced-configuration');
        break;
    }
  };

  return (
    <div className="device-config-layout">
      <div className="device-config-sidebar">
        <h2>Device Configuration</h2>
        <div className="device-config-tabs">
          <button
            className={`device-config-tab ${activeTab === 'basic' ? 'active' : ''}`}
            onClick={() => handleTabClick('basic')}
          >
            Basic Details
          </button>
          <button
            className={`device-config-tab ${activeTab === 'device' ? 'active' : ''}`}
            onClick={() => handleTabClick('device')}
          >
            Device Configuration
          </button>
          {showAdvancedTab && (
            <button
              className={`device-config-tab ${activeTab === 'advanced' ? 'active' : ''}`}
              onClick={() => handleTabClick('advanced')}
            >
              Advanced Configuration
            </button>
          )}
        </div>
      </div>
      <div className="device-config-content">
        {activeTab === 'basic' && <BasicDetails />}
        {activeTab === 'device' && <DeviceConfigurationForm />}
        {activeTab === 'advanced' && showAdvancedTab && <AdvancedConfiguration />}
      </div>
    </div>
  );
};

export default DeviceConfigLayout; 