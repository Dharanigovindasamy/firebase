import React, { useState } from 'react';
import { useDeviceStore } from '../store/deviceStore';
import BasicDetails from './DeviceConfigForm/tabs/BasicDetails';
import DeviceConfigurationTab from './DeviceConfigForm/tabs/DeviceConfiguration';
import AdvancedConfiguration from './DeviceConfigForm/tabs/AdvancedConfiguration';

const DeviceConfiguration = () => {
  const [activeTab, setActiveTab] = useState('basicDetails');
  const { basicDetails, deviceConfig, advancedConfig } = useDeviceStore();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSave = () => {
    // All data is already in the store, just log it
    console.log('Saving all configuration:', {
      basicDetails,
      deviceConfig,
      advancedConfig
    });
  };

  return (
    <div className="device-configuration">
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'basicDetails' ? 'active' : ''}`}
          onClick={() => handleTabChange('basicDetails')}
        >
          Basic Details
        </button>
        <button 
          className={`tab ${activeTab === 'deviceConfig' ? 'active' : ''}`}
          onClick={() => handleTabChange('deviceConfig')}
        >
          Device Configuration
        </button>
        <button 
          className={`tab ${activeTab === 'advancedConfig' ? 'active' : ''}`}
          onClick={() => handleTabChange('advancedConfig')}
        >
          Advanced Configuration
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'basicDetails' && (
          <BasicDetails />
        )}
        {activeTab === 'deviceConfig' && (
          <DeviceConfigurationTab />
        )}
        {activeTab === 'advancedConfig' && (
          <AdvancedConfiguration />
        )}
      </div>

      {activeTab === 'advancedConfig' && (
        <button className="save-button" onClick={handleSave}>
          Save All Configuration
        </button>
      )}
    </div>
  );
};

export default DeviceConfiguration; 