// Types for device configuration schema
export interface DeviceOption {
  name: string;
  label: string;
}

export interface DeviceField {
  id: string;
  type: 'text' | 'list' | 'checkbox';
  required: boolean;
  disabled?: boolean;
  generatorFunction?: string;
  label?: string;
  options?: DeviceOption[];
  conditionalMandatory?: boolean;
  conditionalMandatoryField?: string;
  conditionalMandatoryValue?: string;
}

export interface DeviceSection {
  name: string;
  schema: DeviceField[];
}

export interface DeviceConfiguration {
  deviceConfiguration: DeviceSection[];
}

// Validation functions
export const validateDeviceConfiguration = (config: DeviceConfiguration): boolean => {
  if (!config.deviceConfiguration || !Array.isArray(config.deviceConfiguration)) {
    return false;
  }

  return config.deviceConfiguration.every(section => {
    if (!section.name || !Array.isArray(section.schema)) {
      return false;
    }

    return section.schema.every(field => {
      // Basic validation
      if (!field.id || !field.type) {
        return false;
      }

      // Type-specific validation
      switch (field.type) {
        case 'list':
          if (!field.options || !Array.isArray(field.options)) {
            return false;
          }
          return field.options.every(option => 
            typeof option.name === 'string' && 
            typeof option.label === 'string'
          );
        
        case 'checkbox':
          if (field.conditionalMandatory) {
            if (!field.conditionalMandatoryField || !field.conditionalMandatoryValue) {
              return false;
            }
          }
          return true;

        case 'text':
          return true;

        default:
          return false;
      }
    });
  });
}; 