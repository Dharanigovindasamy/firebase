import { z } from 'zod';

// Admin types enum
export const AdminType = {
  SUPER_ADMIN: 'Super admin',
  LOCAL_ADMIN: 'Local admin',
  AUDIT_ADMIN: 'Audit admin'
} as const;

// Gender enum
export const Gender = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other'
} as const;

// Field types enum
export const FieldType = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  SELECT: 'select',
  RADIO: 'radio',
  MULTI_SELECT: 'multi-select'
} as const;

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