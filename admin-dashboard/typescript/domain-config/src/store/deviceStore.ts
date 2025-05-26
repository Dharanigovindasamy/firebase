import { create } from 'zustand';

interface DeviceState {
  basicDetails: {
    deviceId: string;
    deviceName: string;
    deviceType: string;
    // description: string;
  };
  deviceConfig: {
    ipAddress: string;
    port: string;
    protocol: string;
  };
  advancedConfig: {
    timeout: string;
    retryCount: string;
    encryption: string;
  };
  setBasicDetails: (details: Partial<DeviceState['basicDetails']>) => void;
  setDeviceConfig: (config: Partial<DeviceState['deviceConfig']>) => void;
  setAdvancedConfig: (config: Partial<DeviceState['advancedConfig']>) => void;
  resetStore: () => void;
}

const initialState = {
  basicDetails: {
    deviceId: '',
    deviceName: '',
    deviceType: '',
    // description: ''
  },
  deviceConfig: {
    ipAddress: '',
    port: '',
    protocol: ''
  },
  advancedConfig: {
    timeout: '',
    retryCount: '',
    encryption: ''
  }
};

export const useDeviceStore = create<DeviceState>((set) => ({
  ...initialState,
  setBasicDetails: (details) => 
    set((state) => ({
      basicDetails: { ...state.basicDetails, ...details }
    })),
  setDeviceConfig: (config) =>
    set((state) => ({
      deviceConfig: { ...state.deviceConfig, ...config }
    })),
  setAdvancedConfig: (config) =>
    set((state) => ({
      advancedConfig: { ...state.advancedConfig, ...config }
    })),
  resetStore: () => set(initialState)
})); 