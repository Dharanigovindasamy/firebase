import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
//import useBasicDetailsStore from '../../../store/basicDetailsStore';
import { Outlet } from 'react-router-dom';
import './DeviceConfiguration.css';

interface DeviceConfigForm {
  macAddress: string;
  firmwareVersion: string;
  ipAssignment: string;
  subnetMask: string;
  ipAddress: string;
  gateway: string;
}

const DeviceConfiguration = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubnetValid, setIsSubnetValid] = useState(false);

  // Get basic details from store
  //const { } = useBasicDetailsStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<DeviceConfigForm>({
    defaultValues: {
      firmwareVersion: '3.14.5',
      ipAssignment: 'DHCP'
    }
  });

  const subnetMask = watch('subnetMask');
  const ipAssignment = watch('ipAssignment');

  const validateSubnetMask = (mask: string) => {
    const pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!pattern.test(mask)) return false;

    const octets = mask.split('.');
    return octets.every(octet => {
      const num = parseInt(octet);
      return num >= 0 && num <= 255;
    });
  };

  const validateIPAddress = (ip: string) => {
    const pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!pattern.test(ip)) return false;

    const octets = ip.split('.');
    if (octets.length !== 4) return false;

    // Check if IP is in range 10.0.0.0 to 10.0.0.255
    if (octets[0] !== '10' || octets[1] !== '0' || octets[2] !== '0') return false;
    const lastOctet = parseInt(octets[3]);
    return lastOctet >= 0 && lastOctet <= 255;
  };

  const validateMACAddress = (mac: string) => {
    const pattern = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    return pattern.test(mac);
  };

  const validateGateway = (gateway: string) => {
    const pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!pattern.test(gateway)) return false;

    const octets = gateway.split('.');
    return octets.every(octet => {
      const num = parseInt(octet);
      return num >= 0 && num <= 255;
    });
  };

  const onSubmit = (data: DeviceConfigForm) => {
    console.log('Device Configuration Form Data:', data);
    setSuccessMessage('Device configuration saved successfully!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  useEffect(() => {
    if (subnetMask) {
      setIsSubnetValid(validateSubnetMask(subnetMask));
    } else {
      setIsSubnetValid(false);
    }
  }, [subnetMask]);

  return (
    <div className="device-configuration">
      <h3>Device Configuration</h3>
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="macAddress">MAC Address</label>
          <input
            id="macAddress"
            type="text"
            placeholder="00:1A:2B:3C:4D:5E"
            {...register('macAddress', {
              required: 'MAC address is required',
              validate: value => validateMACAddress(value) || 'Invalid MAC address format (e.g., 00:1A:2B:3C:4D:5E)'
            })}
            className={errors.macAddress ? 'error' : ''}
          />
          {errors.macAddress && (
            <span className="error-message">{errors.macAddress.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="firmwareVersion">Firmware Version</label>
          <input
            id="firmwareVersion"
            type="text"
            value="3.14.5"
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="ipAssignment">IP Assignment</label>
          <select
            id="ipAssignment"
            {...register('ipAssignment', {
              required: 'IP assignment is required'
            })}
            className={errors.ipAssignment ? 'error' : ''}
          >
            <option value="DHCP">DHCP</option>
            <option value="static">Static</option>
          </select>
          {errors.ipAssignment && (
            <span className="error-message">{errors.ipAssignment.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="subnetMask">Subnet Mask</label>
          <input
            id="subnetMask"
            type="text"
            placeholder="255.255.255.0"
            {...register('subnetMask', {
              required: 'Subnet mask is required',
              validate: value => validateSubnetMask(value) || 'Invalid subnet mask format (e.g., 255.255.255.0)'
            })}
            className={errors.subnetMask ? 'error' : ''}
          />
          {errors.subnetMask && (
            <span className="error-message">{errors.subnetMask.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="ipAddress">IP Address</label>
          <input
            id="ipAddress"
            type="text"
            placeholder="10.0.0.0"
            {...register('ipAddress', {
              required: 'IP address is required',
              validate: value => validateIPAddress(value) || 'IP must be in range 10.0.0.0 to 10.0.0.255'
            })}
            className={errors.ipAddress ? 'error' : ''}
            disabled={!isSubnetValid || ipAssignment === 'DHCP'}
          />
          {errors.ipAddress && (
            <span className="error-message">{errors.ipAddress.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="gateway">Gateway</label>
          <input
            id="gateway"
            type="text"
            placeholder="192.168.1.1"
            {...register('gateway', {
              required: 'Gateway is required',
              validate: value => validateGateway(value) || 'Invalid gateway format'
            })}
            className={errors.gateway ? 'error' : ''}
            disabled={ipAssignment === 'DHCP'}
          />
          {errors.gateway && (
            <span className="error-message">{errors.gateway.message}</span>
          )}
        </div>

        <button type="submit" className="submit-button">
          Save Device Configuration
        </button>
      </form>
      <Outlet />
    </div>
  );
};

export default DeviceConfiguration; 