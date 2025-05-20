import { create } from 'zustand';
import { DeviceConfiguration, DeviceField, validateDeviceConfiguration } from '../schemas/deviceSchema';

interface DeviceStore {
  // State
  deviceConfig: DeviceConfiguration | null;
  deviceValues: Record<string, any>;
  errors: Record<string, string>;
  
  // Actions
  setDeviceConfig: (config: DeviceConfiguration) => void;
  updateDeviceValue: (fieldId: string, value: any) => void;
  clearDeviceConfig: () => void;
  validateField: (fieldId: string, value: any) => boolean;
  getFieldValue: (fieldId: string) => any;
  getFieldError: (fieldId: string) => string | undefined;
}

// Helper function to generate a 16-digit ID
const generate16DigitId = (): string => {
  return Math.random().toString(36).substring(2, 18).padEnd(16, '0');
};

export const useDeviceStore = create<DeviceStore>((set, get) => ({
  // Initial state
  deviceConfig: null,
  deviceValues: {},
  errors: {},

  // Set the device configuration
  setDeviceConfig: (config) => {
    if (validateDeviceConfiguration(config)) {
      set({ deviceConfig: config });
      
      // Initialize values for fields with generator functions
      const initialValues: Record<string, any> = {};
      config.deviceConfiguration.forEach(section => {
        section.schema.forEach(field => {
          if (field.generatorFunction === 'generate16DigitId') {
            initialValues[field.id] = generate16DigitId();
          }
        });
      });
      
      set({ deviceValues: initialValues });
    } else {
      console.error('Invalid device configuration');
    }
  },

  // Update a field value
  updateDeviceValue: (fieldId, value) => {
    set((state) => ({
      deviceValues: {
        ...state.deviceValues,
        [fieldId]: value
      }
    }));
  },

  // Clear the device configuration
  clearDeviceConfig: () => {
    set({
      deviceConfig: null,
      deviceValues: {},
      errors: {}
    });
  },

  // Validate a specific field
  validateField: (fieldId, value) => {
    const state = get();
    if (!state.deviceConfig) return false;

    let isValid = true;
    const errors: Record<string, string> = { ...state.errors };

    // Find the field in the configuration
    const field = state.deviceConfig.deviceConfiguration
      .flatMap(section => section.schema)
      .find(f => f.id === fieldId);

    if (field) {
      // Required field validation
      if (field.required && !value) {
        isValid = false;
        errors[fieldId] = 'This field is required';
      }

      // Conditional mandatory validation
      if (field.conditionalMandatory && field.conditionalMandatoryField) {
        const dependentValue = state.deviceValues[field.conditionalMandatoryField];
        if (dependentValue === field.conditionalMandatoryValue && !value) {
          isValid = false;
          errors[fieldId] = 'This field is required based on the selected device type';
        }
      }

      // Clear error if field is valid
      if (isValid) {
        delete errors[fieldId];
      }
    }

    set({ errors });
    return isValid;
  },

  // Get a field's value
  getFieldValue: (fieldId) => {
    return get().deviceValues[fieldId];
  },

  // Get a field's error message
  getFieldError: (fieldId) => {
    return get().errors[fieldId];
  }
})); 