import { create } from 'zustand';
import { DomainConfiguration, validateDomainConfiguration, departmentMapping } from '../schemas/domainSchema';

// Validation Schema
export const domainValidationSchema = {
  domainName: {
    required: "Domain name is required",
    pattern: {
      value: /^[a-zA-Z0-9- ]+$/,
      message: "Invalid domain name"
    }
  },
  continent: {
    required: "Continent is required"
  },
  country: {
    required: "Country is required"
  },
  department: {
    required: "At least one department must be selected"
  }
};

interface DomainStore {
  // State
  domainConfig: DomainConfiguration | null;
  domainValues: Record<string, any>;
  errors: Record<string, string>;
  
  // Actions
  setDomainConfig: (config: DomainConfiguration) => void;
  updateDomainValue: (fieldId: string, value: any) => void;
  clearDomainConfig: () => void;
  validateField: (fieldId: string, value: any) => boolean;
  getFieldValue: (fieldId: string) => any;
  getFieldError: (fieldId: string) => string | undefined;
  getDepartmentsForRegion: (region: string) => string[];
}

export const useDomainStore = create<DomainStore>((set, get) => ({
  // Initial state
  domainConfig: null,
  domainValues: {},
  errors: {},

  // Set the domain configuration
  setDomainConfig: (config) => {
    if (validateDomainConfiguration(config)) {
      set({ domainConfig: config });
    } else {
      console.error('Invalid domain configuration');
    }
  },

  // Update a field value
  updateDomainValue: (fieldId, value) => {
    set((state) => ({
      domainValues: {
        ...state.domainValues,
        [fieldId]: value
      }
    }));

    // If the updated field is a region, update dependent fields
    const field = state.domainConfig?.domainConfiguration
      .flatMap(section => section.schema)
      .find(f => f.id === fieldId);

    if (field?.type === 'select' && value) {
      const dependentFields = state.domainConfig?.domainConfiguration
        .flatMap(section => section.schema)
        .filter(f => f.dependsOn?.field === fieldId);

      if (dependentFields) {
        dependentFields.forEach(depField => {
          if (depField.dependsOn?.value === value) {
            // Update dependent field with new options
            const departments = get().getDepartmentsForRegion(value);
            set(state => ({
              domainValues: {
                ...state.domainValues,
                [depField.id]: departments
              }
            }));
          }
        });
      }
    }
  },

  // Clear the domain configuration
  clearDomainConfig: () => {
    set({
      domainConfig: null,
      domainValues: {},
      errors: {}
    });
  },

  // Validate a specific field
  validateField: (fieldId, value) => {
    const state = get();
    if (!state.domainConfig) return false;

    let isValid = true;
    const errors: Record<string, string> = { ...state.errors };

    // Find the field in the configuration
    const field = state.domainConfig.domainConfiguration
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
          case 'text':
            if (field.validation?.pattern && !field.validation.pattern.test(value)) {
              isValid = false;
              errors[fieldId] = field.validation.patternMessage || 'Invalid format';
            }
            if (field.validation?.minLength && value.length < field.validation.minLength) {
              isValid = false;
              errors[fieldId] = `Must be at least ${field.validation.minLength} characters`;
            }
            break;

          case 'multi-select':
            if (!Array.isArray(value) || value.length === 0) {
              isValid = false;
              errors[fieldId] = 'Please select at least one option';
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
    return get().domainValues[fieldId];
  },

  // Get a field's error message
  getFieldError: (fieldId) => {
    return get().errors[fieldId];
  },

  // Get departments for a specific region
  getDepartmentsForRegion: (region: string) => {
    return departmentMapping[region] || [];
  }
})); 