import { z } from 'zod';

// Field types enum
export const FieldType = {
  TEXT: 'text',
  SELECT: 'select',
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

// Available departments mapping
export const departmentMapping: Record<string, string[]> = {
  Asia: ["Admin", "UI", "Server", "Sales"],
  Europe: ["Testing", "Security testing", "Management"],
  "North America": ["Communication", "Sales", "Admin"],
  "United States": ["Server", "Management", "Security testing"],
  India: ["Admin", "UI", "Server"],
  Germany: ["Testing", "Security testing"],
};

// Domain Schema using Zod
export const domainSchema = z.object({
  domainName: z.string()
    .min(2, 'Domain name must be at least 2 characters')
    .regex(/^[a-zA-Z0-9.-]+$/, 'Domain name should only contain letters, numbers, dots and hyphens'),
  
  continent: z.string({
    required_error: 'Please select a continent',
  }),
  
  country: z.string({
    required_error: 'Please select a country',
  }),
  
  department: z.array(z.string())
    .min(1, 'Please select at least one department')
});

// Type inference from schema
export type DomainSchema = z.infer<typeof domainSchema>;

// Field metadata for domain form
export const domainFieldMetadata: Record<keyof DomainSchema, FieldMetadata> = {
  domainName: {
    label: 'Domain Name',
    type: 'TEXT',
    placeholder: 'Enter domain name',
    required: true,
    description: 'Enter a valid domain name (e.g., example.com)',
    validation: {
      min: 2,
      pattern: /^[a-zA-Z0-9.-]+$/,
      patternMessage: 'Domain name should only contain letters, numbers, dots and hyphens'
    }
  },
  
  continent: {
    label: 'Continent',
    type: 'SELECT',
    required: true,
    description: 'Select the continent where the domain is located',
    options: [] // Will be populated dynamically from API
  },
  
  country: {
    label: 'Country',
    type: 'SELECT',
    required: true,
    description: 'Select the country where the domain is located',
    options: [] // Will be populated dynamically based on selected continent
  },
  
  department: {
    label: 'Departments',
    type: 'MULTI_SELECT',
    required: true,
    description: 'Select one or more departments for this domain',
    options: [] // Will be populated dynamically based on selected country/continent
  }
};

// Validation Schema for react-hook-form
export const domainValidationSchema = {
  domainName: {
    required: "Domain name is required",
    pattern: {
      value: /^[a-zA-Z0-9.-]+$/,
      message: "Domain name should only contain letters, numbers, dots and hyphens"
    },
    minLength: {
      value: 2,
      message: "Domain name must be at least 2 characters"
    }
  },
  
  continent: {
    required: "Please select a continent"
  },
  
  country: {
    required: "Please select a country"
  },
  
  department: {
    required: "Please select at least one department"
  }
}; 

