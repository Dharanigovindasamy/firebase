export const FieldType = {
  TEXT: 'text',
  SELECT: 'select',
  MULTI_SELECT: 'multi-select'
} as const;

export const ValidationPatterns = {
  DOMAIN_NAME: /^[a-zA-Z0-9-]{3,50}$/,
  REGION: /^[a-zA-Z\s]{2,50}$/
} as const;

export interface DomainField {
  id: string;
  type: 'text' | 'select' | 'multi-select';
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

export interface DomainConfiguration {
  domainConfiguration: {
    name: string;
    schema: DomainField[];
  }[];
}

export interface DomainFormData {
  domainName: string;
  continent: string;
  country: string;
  department: string[];
}

export const validateDomainForm = (data: DomainFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Domain name validation
  if (!data.domainName) {
    errors.domainName = "Domain name is required";
  } else if (!/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(data.domainName)) {
    errors.domainName = "Please enter a valid domain name (e.g., example.com)";
  }

  // Continent validation
  if (!data.continent) {
    errors.continent = "Continent is required";
  }

  // Country validation
  if (!data.country) {
    errors.country = "Country is required";
  }

  // Department validation
  if (!data.department || data.department.length === 0) {
    errors.department = "At least one department must be selected";
  }

  return errors;
};

// Department mapping based on region
export const getDepartmentsForRegion = (continent: string, country: string): string[] => {
  const departmentMapping: Record<string, Record<string, string[]>> = {
    'Asia': {
      'India': ['IT', 'HR', 'Finance', 'Operations'],
      'China': ['IT', 'Marketing', 'Operations'],
      'Japan': ['IT', 'R&D', 'Operations']
    },
    'Europe': {
      'Germany': ['IT', 'Engineering', 'Operations'],
      'France': ['IT', 'Marketing', 'Operations'],
      'UK': ['IT', 'Finance', 'Operations']
    },
    'North America': {
      'USA': ['IT', 'Sales', 'Operations'],
      'Canada': ['IT', 'HR', 'Operations'],
      'Mexico': ['IT', 'Operations']
    }
  };

  return departmentMapping[continent]?.[country] || [];
};

export const domainFields: DomainField[] = [
  {
    id: 'domainName',
    type: 'text',
    required: true,
    label: 'Domain Name',
    placeholder: 'Enter domain name',
    validation: {
      pattern: ValidationPatterns.DOMAIN_NAME,
      patternMessage: 'Domain name should only contain letters, numbers and hyphens',
      minLength: 3,
      maxLength: 50
    }
  },
  {
    id: 'continent',
    type: 'select',
    required: true,
    label: 'Continent',
    options: [
      { name: 'asia', label: 'Asia' },
      { name: 'europe', label: 'Europe' },
      { name: 'north-america', label: 'North America' }
    ]
  },
  {
    id: 'country',
    type: 'select',
    required: true,
    label: 'Country',
    options: []
  },
  {
    id: 'department',
    type: 'multi-select',
    required: true,
    label: 'Department',
    options: []
  }
];

export const validateDomainField = (field: DomainField, value: any, formValues: Record<string, any>): string | null => {
  if (field.required && !value) {
    return `${field.label} is required`;
  }

  if (!value) return null;

  switch (field.type) {
    case 'text':
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

    case 'multi-select':
      if (!Array.isArray(value) || value.length === 0) {
        return `Please select at least one ${field.label.toLowerCase()}`;
      }
      break;
  }

  return null;
};

export const isFieldRequired = (field: DomainField, values: Record<string, any>): boolean => {
  if (!field.dependsOn) return field.required;

  const { field: dependentField, value: dependentValue } = field.dependsOn;
  return field.required && values[dependentField] === dependentValue;
};

export const domainConfiguration: DomainConfiguration = {
  domainConfiguration: [
    {
      name: 'Domain Details',
      schema: domainFields
    }
  ]
}; 