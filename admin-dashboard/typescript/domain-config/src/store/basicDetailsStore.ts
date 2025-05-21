import { create } from 'zustand';

interface BasicDetailsState {
  deviceId: string;
  deviceName: string;
  deviceType: string;
  isSaved: boolean;
  setDeviceId: (deviceId: string) => void;
  setDeviceName: (deviceName: string) => void;
  setDeviceType: (deviceType: string) => void;
  saveBasicDetails: (details: Omit<BasicDetailsState, 'isSaved' | 'setDeviceId' | 'setDeviceName' | 'setDeviceType' | 'saveBasicDetails' | 'resetBasicDetails'>) => void;
  resetBasicDetails: () => void;
}

const useBasicDetailsStore = create<BasicDetailsState>((set) => ({
  deviceId: '',
  deviceName: '',
  deviceType: '',
  isSaved: false,
  setDeviceId: (deviceId) => set({ deviceId }),
  setDeviceName: (deviceName) => set({ deviceName }),
  setDeviceType: (deviceType) => set({ deviceType }),
  saveBasicDetails: (details) => set({ ...details, isSaved: true }),
  resetBasicDetails: () => set({
    deviceId: '',
    deviceName: '',
    deviceType: '',
    isSaved: false
  })
}));

export default useBasicDetailsStore; 