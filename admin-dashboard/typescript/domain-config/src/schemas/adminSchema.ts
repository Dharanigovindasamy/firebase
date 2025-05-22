import { AdminType, Gender } from '../types/admin';

export const FieldType = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  RADIO: 'radio',
  SELECT: 'select',
  MULTI_SELECT: 'multi-select'
} as const;

export const ValidationPatterns = {
  NAME: /^[a-zA-Z\s]{2,50}$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/
} as const;

export interface AdminField {
  id: string;
  type: keyof typeof FieldType;
  required: boolean;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  options?: { name: string; label: string }[];
  validation?: {
    pattern?: RegExp;
    patternMessage?: string;
    minLength?: number;
    maxLength?: number;
  };
  conditionalMandatory?: boolean;
  conditionalMandatoryField?: string;
  conditionalMandatoryValue?: string;
 
}

export interface AdminConfiguration {
  adminConfiguration: {
    name: string;
    schema: AdminField[];
  }[];
}

export const adminFields: AdminField[] = [
  {
    id: 'name',
    type: 'TEXT',
    required: true,
    label: 'Name',
    placeholder: 'Enter your name',
    validation: {
      pattern: ValidationPatterns.NAME,
      patternMessage: 'Name should only contain letters and spaces',
      minLength: 2,
      maxLength: 50
    }
  },
  {
    id: 'username',
    type: 'TEXT',
    required: true,
    label: 'Username',
    placeholder: 'Enter username',
    validation: {
      pattern: ValidationPatterns.USERNAME,
      patternMessage: 'Username should be 3-20 characters and can contain letters, numbers, and underscores',
      minLength: 3,
      maxLength: 20
    }
  },
  {
    id: 'email',
    type: 'EMAIL',
    required: false,
    label: 'Email',
    placeholder: 'Enter email address',
    validation: {
      pattern: ValidationPatterns.EMAIL,
      patternMessage: 'Please enter a valid email address'
    },
    conditionalMandatory: true,
    conditionalMandatoryField: 'type',
    conditionalMandatoryValue: AdminType.SUPER_ADMIN,
  
  },
  {
    id: 'password',
    type: 'PASSWORD',
    required: true,
    label: 'Password',
    placeholder: 'Enter password',
    validation: {
      pattern: ValidationPatterns.PASSWORD,
      patternMessage: 'Password must be at least 8 characters and include both letters and numbers'
    }
  },
  {
    id: 'gender',
    type: 'RADIO',
    required: true,
    label: 'Gender',
    options: [
      { name: Gender.MALE, label: 'Male' },
      { name: Gender.FEMALE, label: 'Female' },
      { name: Gender.OTHER, label: 'Other' }
    ]
  },
  {
    id: 'type',
    type: 'SELECT',
    required: true,
    label: 'Admin Type',
    options: [
      { name: AdminType.SUPER_ADMIN, label: 'Super Admin' },
      { name: AdminType.LOCAL_ADMIN, label: 'Local Admin' },
      { name: AdminType.AUDIT_ADMIN, label: 'Audit Admin' }
    ]
  },
  {
    id: 'domain',
    type: 'SELECT',
    required: true,
    label: 'Domain',
    options: []
  },
  {
    id: 'department',
    type: 'MULTI_SELECT',
    required: true,
    label: 'Department',
    options: []
  }
];

export const validateAdminField = (field: AdminField, value: any, formValues: Record<string, any>): string | null => {
  // Check if field is required based on conditions
  const isRequired = isFieldRequired(field, formValues);
  
  if (isRequired && !value) {
    return `${field.label} is required`;
  }

  if (!value) return null;

  switch (field.type) {
    case 'TEXT':
    case 'EMAIL':
    case 'PASSWORD':
      if (field.validation?.pattern && !field.validation.pattern.test(value)) {
        return field.validation.patternMessage || 'Invalid format';
      }
      if (field.validation?.minLength && value.length < field.validation.minLength) {
        return `${field.label} must be at least ${field.validation.minLength} characters`;
      }
      if (field.validation?.maxLength && value.length > field.validation.maxLength) {
        return `${field.label} must not exceed ${field.validation.maxLength} characters`;
      }
      break;

    case 'MULTI_SELECT':
      if (!Array.isArray(value) || value.length === 0) {
        return `Please select at least one ${field.label.toLowerCase()}`;
      }
      break;
  }

  return null;
};

export const isFieldRequired = (field: AdminField, values: Record<string, any>): boolean => {
  // Check conditional mandatory requirements
  if (field.conditionalMandatory && 
      field.conditionalMandatoryField && 
      field.conditionalMandatoryValue) {
    const isConditionMet = values[field.conditionalMandatoryField] === field.conditionalMandatoryValue;
    return isConditionMet;
  }

  return field.required;
};

export const validateAdminForm = (data: Record<string, any>): Record<string, string> => {
  const errors: Record<string, string> = {};

  adminFields.forEach(field => {
    const error = validateAdminField(field, data[field.id], data);
    if (error) {
      errors[field.id] = error;
    }
  });

  return errors;
};

export const adminConfiguration: AdminConfiguration = {
  adminConfiguration: [
    {
      name: 'Admin Details',
      schema: adminFields
    }
  ]
}; 