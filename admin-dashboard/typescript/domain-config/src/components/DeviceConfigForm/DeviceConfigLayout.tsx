import React, { useState } from 'react';
import BasicDetails from './tabs/BasicDetails';
import DeviceConfiguration from './tabs/DeviceConfiguration';
import AdvancedConfiguration from './tabs/AdvancedConfiguration';
import './DeviceConfigLayout.css';

const DeviceConfigLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('basic');

  const renderContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicDetails />;
      case 'device':
        return <DeviceConfiguration />;
      case 'advanced':
        return <AdvancedConfiguration />;
      default:
        return <BasicDetails />;
    }
  };

  return (
    <div className="device-config-layout">
      <div className="device-config-sidebar">
        <h2>Device Configuration</h2>
        <div className="device-config-tabs">
          <button
            className={`device-config-tab ${activeTab === 'basic' ? 'active' : ''}`}
            onClick={() => setActiveTab('basic')}
          >
            Basic Details
          </button>
          <button
            className={`device-config-tab ${activeTab === 'device' ? 'active' : ''}`}
            onClick={() => setActiveTab('device')}
          >
            Device Configuration
          </button>
          <button
            className={`device-config-tab ${activeTab === 'advanced' ? 'active' : ''}`}
            onClick={() => setActiveTab('advanced')}
          >
            Advanced Configuration
          </button>
        </div>
      </div>
      <div className="device-config-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default DeviceConfigLayout; 