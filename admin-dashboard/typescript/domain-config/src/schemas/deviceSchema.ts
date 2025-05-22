import { FieldType } from './adminSchema';

export const ValidationPatterns = {
  DEVICE_NAME: /^[a-zA-Z0-9\s-]{3,50}$/,
  DEVICE_ID: /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/,
  MAC_ADDRESS: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
  IP_ADDRESS: /^(\d{1,3}\.){3}\d{1,3}$/,
  SUBNET_MASK: /^(\d{1,3}\.){3}\d{1,3}$/,
  GATEWAY: /^(\d{1,3}\.){3}\d{1,3}$/
} as const;

export interface DeviceField {
  id: string;
  type: keyof typeof FieldType | 'checkbox' | 'list' | 'time';
  required: boolean;
  label?: string;
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
  conditionalMandatoryValue?: string | string[];
  generatorFunction?: string;
  defaultValue?: string | boolean;
}

export interface DeviceConfiguration {
  deviceConfiguration: {
    name: string;
    label: string;
    schema: DeviceField[][];
  }[];
}

export const deviceFields: DeviceField[] = [
  // Basic Details Tab
  {
    id: 'deviceId',
    type: 'TEXT',
    required: true,
    label: 'Device ID',
    disabled: true,
    generatorFunction: 'generate16DigitId',
    validation: {
      pattern: ValidationPatterns.DEVICE_ID,
      patternMessage: 'Invalid device ID format'
    }
  },
  {
    id: 'deviceName',
    type: 'TEXT',
    required: true,
    label: 'Device Name',
    placeholder: 'Enter device name',
    validation: {
      pattern: ValidationPatterns.DEVICE_NAME,
      patternMessage: 'Device name must be 3-50 characters and can only contain letters, numbers, spaces, and hyphens'
    }
  },
  {
    id: 'deviceType',
    type: 'list',
    required: true,
    label: 'Device Type',
    options: [
      { name: 'dect', label: 'Dect' },
      { name: 'icemobile', label: 'Ice mobile' },
      { name: 'ipphone', label: 'IP Phone' },
      { name: 'standarddevice', label: 'Standard Device' },
      { name: 'wifiphone', label: 'Wifi phones' },
      { name: 'sip', label: 'SIP' }
    ]
  },

  // Device Configuration Tab
  {
    id: 'macAddress',
    type: 'TEXT',
    required: true,
    label: 'MAC Address',
    placeholder: '00:1A:2B:3C:4D:5E',
    validation: {
      pattern: ValidationPatterns.MAC_ADDRESS,
      patternMessage: 'Invalid MAC address format (e.g., 00:1A:2B:3C:4D:5E)'
    }
  },
  {
    id: 'firmwareVersion',
    type: 'TEXT',
    required: true,
    label: 'Firmware Version',
    disabled: true,
    defaultValue: '3.14.5'
  },
  {
    id: 'ipAssignment',
    type: 'list',
    required: true,
    label: 'IP Assignment',
    options: [
      { name: 'static', label: 'Static' },
      { name: 'dhcp', label: 'DHCP' }
    ]
  },
  {
    id: 'subnetMask',
    type: 'TEXT',
    required: true,
    label: 'Subnet Mask',
    placeholder: '255.255.255.0',
    validation: {
      pattern: ValidationPatterns.SUBNET_MASK,
      patternMessage: 'Invalid subnet mask format (e.g., 255.255.255.0)'
    }
  },
  {
    id: 'ipAddress',
    type: 'TEXT',
    required: true,
    label: 'IP Address',
    placeholder: '10.0.0.0',
    validation: {
      pattern: ValidationPatterns.IP_ADDRESS,
      patternMessage: 'IP must be in range 10.0.0.0 to 10.0.0.255'
    },
    conditionalMandatory: true,
    conditionalMandatoryField: 'ipAssignment',
    conditionalMandatoryValue: 'static'
  },
  {
    id: 'gateway',
    type: 'TEXT',
    required: true,
    label: 'Gateway',
    placeholder: '192.168.1.1',
    validation: {
      pattern: ValidationPatterns.GATEWAY,
      patternMessage: 'Invalid gateway format'
    },
    conditionalMandatory: true,
    conditionalMandatoryField: 'ipAssignment',
    conditionalMandatoryValue: 'static'
  },

  // Advanced Configuration Tab
  {
    id: 'enableLogging',
    type: 'checkbox',
    required: true,
    label: 'Enable Logging',
    conditionalMandatory: true,
    conditionalMandatoryField: 'deviceType',
    conditionalMandatoryValue: 'wifiphone'
  },
  {
    id: 'logLevel',
    type: 'list',
    required: true,
    label: 'Log Level',
    options: [
      { name: 'error', label: 'Error' },
      { name: 'warning', label: 'Warning' },
      { name: 'info', label: 'Info' },
      { name: 'debug', label: 'Debug' }
    ],
    conditionalMandatory: true,
    conditionalMandatoryField: 'enableLogging',
    conditionalMandatoryValue: 'true'
  },
  {
    id: 'locationTag',
    type: 'TEXT',
    required: true,
    label: 'Location Tag',
    placeholder: 'e.g., Floor 2 - South Wing',
    conditionalMandatory: true,
    conditionalMandatoryField: 'deviceType',
    conditionalMandatoryValue: ['sip', 'wifiphone']
  },
  {
    id: 'assignedUser',
    type: 'list',
    required: true,
    label: 'Assigned User',
    options: [
      { name: 'user1', label: 'User 1' },
      { name: 'user2', label: 'User 2' },
      { name: 'user3', label: 'User 3' },
      { name: 'user4', label: 'User 4' },
      { name: 'user5', label: 'User 5' },
      { name: 'user6', label: 'User 6' },
      { name: 'user7', label: 'User 7' },
      { name: 'user8', label: 'User 8' },
      { name: 'user9', label: 'User 9' },
      { name: 'user10', label: 'User 10' }
    ]
  },
  {
    id: 'qosProfile',
    type: 'list',
    required: true,
    label: 'QoS Profile',
    options: [
      { name: 'high', label: 'High' },
      { name: 'medium', label: 'Medium' },
      { name: 'low', label: 'Low' }
    ]
  },
  {
    id: 'timezone',
    type: 'list',
    required: true,
    label: 'Timezone',
    options: [
      { name: 'UTC+01:00', label: 'UTC+01:00' },
      { name: 'UTC+02:00', label: 'UTC+02:00' },
      { name: 'UTC+03:00', label: 'UTC+03:00' },
      { name: 'UTC+04:00', label: 'UTC+04:00' },
      { name: 'UTC+05:00', label: 'UTC+05:00' },
      { name: 'UTC+06:00', label: 'UTC+06:00' },
      { name: 'UTC+07:00', label: 'UTC+07:00' },
      { name: 'UTC+08:00', label: 'UTC+08:00' },
      { name: 'UTC+09:00', label: 'UTC+09:00' },
      { name: 'UTC+10:00', label: 'UTC+10:00' },
      { name: 'UTC+11:00', label: 'UTC+11:00' },
      { name: 'UTC+12:00', label: 'UTC+12:00' },
      { name: 'UTC-01:00', label: 'UTC-01:00' },
      { name: 'UTC-02:00', label: 'UTC-02:00' },
      { name: 'UTC-03:00', label: 'UTC-03:00' },
      { name: 'UTC-04:00', label: 'UTC-04:00' },
      { name: 'UTC-05:00', label: 'UTC-05:00' },
      { name: 'UTC-06:00', label: 'UTC-06:00' },
      { name: 'UTC-07:00', label: 'UTC-07:00' },
      { name: 'UTC-08:00', label: 'UTC-08:00' },
      { name: 'UTC-09:00', label: 'UTC-09:00' },
      { name: 'UTC-10:00', label: 'UTC-10:00' },
      { name: 'UTC-11:00', label: 'UTC-11:00' },
      { name: 'UTC-12:00', label: 'UTC-12:00' },
      { name: 'PST', label: 'PST' },
      { name: 'EST', label: 'EST' },
      { name: 'CST', label: 'CST' },
      { name: 'MST', label: 'MST' }
    ],
    conditionalMandatory: true,
    conditionalMandatoryField: 'deviceType',
    conditionalMandatoryValue: ['sip', 'wifiphone']
  },
  {
    id: 'rebootSchedule',
    type: 'time',
    required: true,
    label: 'Reboot Schedule',
    placeholder: 'HH:MM',
    conditionalMandatory: true,
    conditionalMandatoryField: 'deviceType',
    conditionalMandatoryValue: ['sip', 'wifiphone']
  }
];

export const deviceConfiguration: DeviceConfiguration = {
  deviceConfiguration: [
    {
      name: 'Basic Details',
      label: 'Basic-Details',
      schema: [
        [
          {
            id: 'deviceId',
            type: 'TEXT',
            required: true,
            label: 'Device ID',
            disabled: true,
            generatorFunction: 'generate16DigitId',
            validation: {
              pattern: ValidationPatterns.DEVICE_ID,
              patternMessage: 'Invalid device ID format'
            }
          }
        ],
        [
          {
            id: 'deviceName',
            type: 'TEXT',
            required: true,
            label: 'Device Name',
            placeholder: 'Enter device name',
            validation: {
              pattern: ValidationPatterns.DEVICE_NAME,
              patternMessage: 'Device name must be 3-50 characters and can only contain letters, numbers, spaces, and hyphens'
            }
          }
        ],
        [
          {
            id: 'deviceType',
            type: 'list',
            required: true,
            label: 'Device Type',
            options: [
              { name: 'dect', label: 'Dect' },
              { name: 'icemobile', label: 'Ice mobile' },
              { name: 'ipphone', label: 'IP Phone' },
              { name: 'standarddevice', label: 'Standard Device' },
              { name: 'wifiphone', label: 'Wifi phones' },
              { name: 'sip', label: 'SIP' }
            ]
          }
        ]
      ]
    },
    {
      name: 'Device Configuration',
      label: 'Device-Configuration',
      schema: [
        [
          {
            id: 'macAddress',
            type: 'TEXT',
            required: true,
            label: 'MAC Address',
            placeholder: '00:1A:2B:3C:4D:5E',
            validation: {
              pattern: ValidationPatterns.MAC_ADDRESS,
              patternMessage: 'Invalid MAC address format (e.g., 00:1A:2B:3C:4D:5E)'
            }
          }
        ],
        [
          {
            id: 'firmwareVersion',
            type: 'TEXT',
            required: true,
            label: 'Firmware Version',
            disabled: true,
            defaultValue: '3.14.5'
          }
        ],
        [
          {
            id: 'ipAssignment',
            type: 'list',
            required: true,
            label: 'IP Assignment',
            options: [
              { name: 'static', label: 'Static' },
              { name: 'dhcp', label: 'DHCP' }
            ]
          }
        ],
        [
          {
            id: 'subnetMask',
            type: 'TEXT',
            required: true,
            label: 'Subnet Mask',
            placeholder: '255.255.255.0',
            validation: {
              pattern: ValidationPatterns.SUBNET_MASK,
              patternMessage: 'Invalid subnet mask format (e.g., 255.255.255.0)'
            }
          }
        ],
        [
          {
            id: 'ipAddress',
            type: 'TEXT',
            required: true,
            label: 'IP Address',
            placeholder: '10.0.0.0',
            validation: {
              pattern: ValidationPatterns.IP_ADDRESS,
              patternMessage: 'IP must be in range 10.0.0.0 to 10.0.0.255'
            },
            conditionalMandatory: true,
            conditionalMandatoryField: 'ipAssignment',
            conditionalMandatoryValue: 'static'
          }
        ],
        [
          {
            id: 'gateway',
            type: 'TEXT',
            required: true,
            label: 'Gateway',
            placeholder: '192.168.1.1',
            validation: {
              pattern: ValidationPatterns.GATEWAY,
              patternMessage: 'Invalid gateway format'
            },
            conditionalMandatory: true,
            conditionalMandatoryField: 'ipAssignment',
            conditionalMandatoryValue: 'static'
          }
        ]
      ]
    },
    {
      name: 'Advanced Configuration',
      label: 'Advanced-Configuration',
      schema: [
        [
          {
            id: 'enableLogging',
            type: 'checkbox',
            required: true,
            label: 'Enable Logging',
            conditionalMandatory: true,
            conditionalMandatoryField: 'deviceType',
            conditionalMandatoryValue: 'wifiphone'
          }
        ],
        [
          {
            id: 'logLevel',
            type: 'list',
            required: true,
            label: 'Log Level',
            options: [
              { name: 'error', label: 'Error' },
              { name: 'warning', label: 'Warning' },
              { name: 'info', label: 'Info' },
              { name: 'debug', label: 'Debug' }
            ],
            conditionalMandatory: true,
            conditionalMandatoryField: 'enableLogging',
            conditionalMandatoryValue: 'true'
          }
        ],
        [
          {
            id: 'locationTag',
            type: 'TEXT',
            required: true,
            label: 'Location Tag',
            placeholder: 'e.g., Floor 2 - South Wing',
            conditionalMandatory: true,
            conditionalMandatoryField: 'deviceType',
            conditionalMandatoryValue: ['sip', 'wifiphone']
          }
        ],
        [
          {
            id: 'assignedUser',
            type: 'list',
            required: true,
            label: 'Assigned User',
            options: [
              { name: 'user1', label: 'User 1' },
              { name: 'user2', label: 'User 2' },
              { name: 'user3', label: 'User 3' },
              { name: 'user4', label: 'User 4' },
              { name: 'user5', label: 'User 5' },
              { name: 'user6', label: 'User 6' },
              { name: 'user7', label: 'User 7' },
              { name: 'user8', label: 'User 8' },
              { name: 'user9', label: 'User 9' },
              { name: 'user10', label: 'User 10' }
            ]
          }
        ],
        [
          {
            id: 'qosProfile',
            type: 'list',
            required: true,
            label: 'QoS Profile',
            options: [
              { name: 'high', label: 'High' },
              { name: 'medium', label: 'Medium' },
              { name: 'low', label: 'Low' }
            ]
          }
        ],
        [
          {
            id: 'timezone',
            type: 'list',
            required: true,
            label: 'Timezone',
            options: [
              { name: 'UTC+01:00', label: 'UTC+01:00' },
              { name: 'UTC+02:00', label: 'UTC+02:00' },
              { name: 'UTC+03:00', label: 'UTC+03:00' },
              { name: 'UTC+04:00', label: 'UTC+04:00' },
              { name: 'UTC+05:00', label: 'UTC+05:00' },
              { name: 'UTC+06:00', label: 'UTC+06:00' },
              { name: 'UTC+07:00', label: 'UTC+07:00' },
              { name: 'UTC+08:00', label: 'UTC+08:00' },
              { name: 'UTC+09:00', label: 'UTC+09:00' },
              { name: 'UTC+10:00', label: 'UTC+10:00' },
              { name: 'UTC+11:00', label: 'UTC+11:00' },
              { name: 'UTC+12:00', label: 'UTC+12:00' },
              { name: 'UTC-01:00', label: 'UTC-01:00' },
              { name: 'UTC-02:00', label: 'UTC-02:00' },
              { name: 'UTC-03:00', label: 'UTC-03:00' },
              { name: 'UTC-04:00', label: 'UTC-04:00' },
              { name: 'UTC-05:00', label: 'UTC-05:00' },
              { name: 'UTC-06:00', label: 'UTC-06:00' },
              { name: 'UTC-07:00', label: 'UTC-07:00' },
              { name: 'UTC-08:00', label: 'UTC-08:00' },
              { name: 'UTC-09:00', label: 'UTC-09:00' },
              { name: 'UTC-10:00', label: 'UTC-10:00' },
              { name: 'UTC-11:00', label: 'UTC-11:00' },
              { name: 'UTC-12:00', label: 'UTC-12:00' },
              { name: 'PST', label: 'PST' },
              { name: 'EST', label: 'EST' },
              { name: 'CST', label: 'CST' },
              { name: 'MST', label: 'MST' }
            ],
            conditionalMandatory: true,
            conditionalMandatoryField: 'deviceType',
            conditionalMandatoryValue: ['sip', 'wifiphone']
          }
        ],
        [
          {
            id: 'rebootSchedule',
            type: 'time',
            required: true,
            label: 'Reboot Schedule',
            placeholder: 'HH:MM',
            conditionalMandatory: true,
            conditionalMandatoryField: 'deviceType',
            conditionalMandatoryValue: ['sip', 'wifiphone']
          }
        ]
      ]
    }
  ]
};

