import { create } from 'zustand';
import { AdminConfiguration, validateAdminConfiguration } from '../schemas/adminSchema';

// Store Interface
interface AdminStore {
  // State
  adminConfig: AdminConfiguration | null;
  adminValues: Record<string, any>;
  errors: Record<string, string>;
  
  // Actions
  setAdminConfig: (config: AdminConfiguration) => void;
  updateAdminValue: (fieldId: string, value: any) => void;
  clearAdminConfig: () => void;
  validateField: (fieldId: string, value: any) => boolean;
  getFieldValue: (fieldId: string) => any;
  getFieldError: (fieldId: string) => string | undefined;
}

// Create Store
export const useAdminStore = create<AdminStore>((set, get) => ({
  // Initial state
  adminConfig: null,
  adminValues: {},
  errors: {},

  // Set the admin configuration
  setAdminConfig: (config) => {
    if (validateAdminConfiguration(config)) {
      set({ adminConfig: config });
    } else {
      console.error('Invalid admin configuration');
    }
  },

  // Update a field value
  updateAdminValue: (fieldId, value) => {
    set((state) => ({
      adminValues: {
        ...state.adminValues,
        [fieldId]: value
      }
    }));
  },

  // Clear the admin configuration
  clearAdminConfig: () => {
    set({
      adminConfig: null,
      adminValues: {},
      errors: {}
    });
  },

  // Validate a specific field
  validateField: (fieldId, value) => {
    const state = get();
    if (!state.adminConfig) return false;

    let isValid = true;
    const errors: Record<string, string> = { ...state.errors };

    // Find the field in the configuration
    const field = state.adminConfig.adminConfiguration
      .flatMap(section => section.schema)
      .find(f => f.id === fieldId);

    if (field) {
      // Required field validation
      if (field.required && !value) {
        isValid = false;
        errors[fieldId] = 'This field is required';
      }

      // Type-specific validation
      if (value) {
        switch (field.type) {
          case 'email':
            const emailPattern = field.validation?.pattern || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (!emailPattern.test(value)) {
              isValid = false;
              errors[fieldId] = field.validation?.patternMessage || 'Invalid email format';
            }
            break;

          case 'password':
            if (field.validation?.minLength && value.length < field.validation.minLength) {
              isValid = false;
              errors[fieldId] = `Password must be at least ${field.validation.minLength} characters`;
            }
            break;

          case 'text':
            if (field.validation?.pattern && !field.validation.pattern.test(value)) {
              isValid = false;
              errors[fieldId] = field.validation.patternMessage || 'Invalid format';
            }
            break;
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
    return get().adminValues[fieldId];
  },

  // Get a field's error message
  getFieldError: (fieldId) => {
    return get().errors[fieldId];
  }
})); 