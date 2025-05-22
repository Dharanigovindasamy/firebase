import { create } from 'zustand';

interface DeviceConfigState {
  // Basic Details
  deviceId: string;
  deviceName: string;
  deviceType: string;
  
  // Device Configuration
  macAddress: string;
  firmwareVersion: string;
  ipAssignment: string;
  subnetMask: string;
  ipAddress: string;
  gateway: string;
  
  // Advanced Configuration
  enableLogging: boolean;
  logLevel: string;
  locationTag: string;
  assignedUser: string;
  qosProfile: string;
  timezone: string;
  rebootSchedule: string;

  // Actions
  setBasicDetails: (details: {
    deviceId: string;
    deviceName: string;
    deviceType: string;
  }) => void;
  
  setDeviceConfig: (config: {
    macAddress: string;
    firmwareVersion: string;
    ipAssignment: string;
    subnetMask: string;
    ipAddress: string;
    gateway: string;
  }) => void;
  
  setAdvancedConfig: (config: {
    enableLogging: boolean;
    logLevel: string;
    locationTag: string;
    assignedUser: string;
    qosProfile: string;
    timezone: string;
    rebootSchedule: string;
  }) => void;
  
  resetDeviceConfig: () => void;
}

const useDeviceConfigStore = create<DeviceConfigState>((set) => ({
  // Initial state
  deviceId: '',
  deviceName: '',
  deviceType: '',
  macAddress: '',
  firmwareVersion: '3.14.5', // Default firmware version
  ipAssignment: 'DHCP',
  subnetMask: '',
  ipAddress: '',
  gateway: '',
  enableLogging: false,
  logLevel: 'Error',
  locationTag: '',
  assignedUser: '',
  qosProfile: 'Medium',
  timezone: 'UTC+00:00',
  rebootSchedule: '',

  // Actions
  setBasicDetails: (details) => set((state) => ({
    ...state,
    ...details
  })),

  setDeviceConfig: (config) => set((state) => ({
    ...state,
    ...config
  })),

  setAdvancedConfig: (config) => set((state) => ({
    ...state,
    ...config
  })),

  resetDeviceConfig: () => set({
    deviceId: '',
    deviceName: '',
    deviceType: '',
    macAddress: '',
    firmwareVersion: '3.14.5',
    ipAssignment: 'DHCP',
    subnetMask: '',
    ipAddress: '',
    gateway: '',
    enableLogging: false,
    logLevel: 'Error',
    locationTag: '',
    assignedUser: '',
    qosProfile: 'Medium',
    timezone: 'UTC+00:00',
    rebootSchedule: ''
  })
}));

export default useDeviceConfigStore; 