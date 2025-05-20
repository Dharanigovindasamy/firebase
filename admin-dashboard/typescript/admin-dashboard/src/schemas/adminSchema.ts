import { z } from 'zod';
import { adminConfiguration, validateAdminField, isFieldRequired } from '../schemas/adminSchema';

// Types for admin configuration schema
export enum AdminType {
  SUPER_ADMIN = 'super_admin',
  LOCAL_ADMIN = 'local_admin',
  AUDIT_ADMIN = 'audit_admin'
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

// Field Types
export const FieldType = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  RADIO: 'radio',
  SELECT: 'select',
  MULTI_SELECT: 'multi-select'
} as const;

// Validation Patterns
export const ValidationPatterns = {
  NAME: /^[a-zA-Z\s]{2,50}$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
} as const;

// Field Interface
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
  dependsOn?: {
    field: string;
    value: string;
  };
}

// Admin Configuration Interface
export interface AdminConfiguration {
  adminConfiguration: {
    name: string;
    schema: AdminField[];
  }[];
}

// Admin Fields Configuration
export const adminFields: AdminField[] = [
  {
    id: 'name',
    type: 'TEXT',
    required: true,
    label: 'Name',
    placeholder: 'Enter your full name',
    validation: {
      pattern: ValidationPatterns.NAME,
      patternMessage: 'Name should only contain letters and spaces (2-50 characters)',
      minLength: 2,
      maxLength: 50
    }
  },
  {
    id: 'username',
    type: 'TEXT',
    required: true,
    label: 'Username',
    placeholder: 'Enter your username',
    validation: {
      pattern: ValidationPatterns.USERNAME,
      patternMessage: 'Username should only contain letters, numbers and underscore (3-20 characters)',
      minLength: 3,
      maxLength: 20
    }
  },
  {
    id: 'email',
    type: 'EMAIL',
    required: false,
    label: 'Email',
    placeholder: 'Enter your email address',
    validation: {
      pattern: ValidationPatterns.EMAIL,
      patternMessage: 'Please enter a valid email address'
    },
    dependsOn: {
      field: 'type',
      value: AdminType.SUPER_ADMIN
    }
  },
  {
    id: 'password',
    type: 'PASSWORD',
    required: true,
    label: 'Password',
    placeholder: 'Enter your password',
    validation: {
      pattern: ValidationPatterns.PASSWORD,
      patternMessage: 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character',
      minLength: 8
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
    options: [] // Will be populated dynamically from server
  },
  {
    id: 'department',
    type: 'MULTI_SELECT',
    required: true,
    label: 'Department',
    options: [], // Will be populated based on domain selection
    dependsOn: {
      field: 'domain',
      value: '' // Will be set dynamically
    }
  }
];

// Validation Functions
export const validateAdminField = (field: AdminField, value: any): string | null => {
  // Required field validation
  if (field.required && !value) {
    return `${field.label} is required`;
  }

  // Skip validation if no value and not required
  if (!value) return null;

  // Type-specific validation
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

// Check if field is required based on dependencies
export const isFieldRequired = (field: AdminField, values: Record<string, any>): boolean => {
  if (!field.dependsOn) return field.required;

  const { field: dependentField, value: dependentValue } = field.dependsOn;
  return field.required && values[dependentField] === dependentValue;
};

// Admin Configuration
export const adminConfiguration: AdminConfiguration = {
  adminConfiguration: [
    {
      name: 'Basic Information',
      schema: adminFields
    }
  ]
};

// Validation functions
export const validateAdminConfiguration = (config: AdminConfiguration): boolean => {
  if (!config.adminConfiguration || !Array.isArray(config.adminConfiguration)) {
    return false;
  }

  return config.adminConfiguration.every(section => {
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
        case 'select':
        case 'multi-select':
          if (!field.options || !Array.isArray(field.options)) {
            return false;
          }
          return field.options.every(option => 
            typeof option.name === 'string' && 
            typeof option.label === 'string'
          );
        
        case 'email':
          if (field.validation?.pattern && !(field.validation.pattern instanceof RegExp)) {
            return false;
          }
          return true;

        case 'password':
          if (field.validation?.minLength && typeof field.validation.minLength !== 'number') {
            return false;
          }
          return true;

        case 'text':
        case 'radio':
          return true;

        default:
          return false;
      }
    });
  });
};

// Field metadata interface
export interface FieldMetadata {
  label: string;
  type: keyof typeof FieldType;
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
  description?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: RegExp;
    patternMessage?: string;
  };
}

// Admin Schema using Zod
export const adminSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces'),
  
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username should only contain letters, numbers and underscore'),
  
  email: z.string()
    .email('Invalid email format')
    .optional()
    .refine((val) => {
      // Email is required only for Super admin
      if (val === undefined) return true;
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val);
    }, 'Invalid email format'),
  
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    ),
  
  gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER], {
    required_error: 'Please select a gender',
  }),
  
  type: z.enum([
    AdminType.SUPER_ADMIN,
    AdminType.LOCAL_ADMIN,
    AdminType.AUDIT_ADMIN
  ], {
    required_error: 'Please select an admin type',
  }),
  
  domain: z.string({
    required_error: 'Please select a domain',
  }),
  
  department: z.array(z.string())
    .min(1, 'Please select at least one department')
});

// Type inference from schema
export type AdminSchema = z.infer<typeof adminSchema>;

// Field metadata for admin form
export const adminFieldMetadata: Record<keyof AdminSchema, FieldMetadata> = {
  name: {
    label: 'Name',
    type: 'TEXT',
    placeholder: 'Enter your full name',
    required: true,
    description: 'Your full name as it appears on official documents',
    validation: {
      min: 2,
      pattern: /^[a-zA-Z\s]+$/,
      patternMessage: 'Name should only contain letters and spaces'
    }
  },
  
  username: {
    label: 'Username',
    type: 'TEXT',
    placeholder: 'Enter your username',
    required: true,
    description: 'Choose a unique username for your account',
    validation: {
      min: 3,
      pattern: /^[a-zA-Z0-9_]+$/,
      patternMessage: 'Username should only contain letters, numbers and underscore'
    }
  },
  
  email: {
    label: 'Email',
    type: 'EMAIL',
    placeholder: 'Enter your email address',
    required: false,
    description: 'Required only for Super admin accounts',
    validation: {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      patternMessage: 'Please enter a valid email address'
    }
  },
  
  password: {
    label: 'Password',
    type: 'PASSWORD',
    placeholder: 'Enter your password',
    required: true,
    description: 'Must contain at least 8 characters, including uppercase, lowercase, number and special character',
    validation: {
      min: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      patternMessage: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    }
  },
  
  gender: {
    label: 'Gender',
    type: 'RADIO',
    required: true,
    options: [
      { label: 'Male', value: Gender.MALE },
      { label: 'Female', value: Gender.FEMALE },
      { label: 'Other', value: Gender.OTHER }
    ]
  },
  
  type: {
    label: 'Admin Type',
    type: 'SELECT',
    required: true,
    description: 'Select the type of admin account',
    options: [
      { label: 'Super Admin', value: AdminType.SUPER_ADMIN },
      { label: 'Local Admin', value: AdminType.LOCAL_ADMIN },
      { label: 'Audit Admin', value: AdminType.AUDIT_ADMIN }
    ]
  },
  
  domain: {
    label: 'Domain',
    type: 'SELECT',
    required: true,
    description: 'Select the domain for this admin account',
    options: [] // Will be populated dynamically from domain store
  },
  
  department: {
    label: 'Departments',
    type: 'MULTI_SELECT',
    required: true,
    description: 'Select one or more departments',
    options: [] // Will be populated dynamically from domain store
  }
};

// Validation Schema for react-hook-form
export const adminValidationSchema = {
  name: {
    required: "Name is required",
    pattern: {
      value: /^[a-zA-Z\s]+$/,
      message: "Name should only contain letters and spaces"
    },
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters"
    }
  },
  
  username: {
    required: "Username is required",
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: "Username should only contain letters, numbers and underscore"
    },
    minLength: {
      value: 3,
      message: "Username must be at least 3 characters"
    }
  },
  
  email: {
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Invalid email format"
    }
  },
  
  password: {
    required: "Password is required",
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    },
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters"
    }
  },
  
  gender: {
    required: "Please select a gender"
  },
  
  type: {
    required: "Please select an admin type"
  },
  
  domain: {
    required: "Please select a domain"
  },
  
  department: {
    required: "Please select at least one department"
  }
};

const fields = adminConfiguration.adminConfiguration[0].schema; 