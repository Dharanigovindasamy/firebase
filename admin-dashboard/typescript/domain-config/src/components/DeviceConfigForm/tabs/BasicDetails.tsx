import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useBasicDetailsStore from '../../../store/basicDetailsStore';
import { Outlet } from 'react-router-dom';
// import './TabStyles.css';
import './BasicDetails.css';

interface BasicDetailsForm {
  deviceId: string;
  deviceName: string;
  deviceType: string;
}

const deviceTypes = [
  'Dect',
  'Ice mobile',
  'Ip phone',
  'Standard device',
  'Wifi phones',
  'SIP'
];

const BasicDetails: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    deviceId,
    deviceName,
    deviceType,
    setDeviceId,
    saveBasicDetails
  } = useBasicDetailsStore();

  // Log store data whenever it changes
  useEffect(() => {
    console.log('Basic Details Store:', {
      deviceId,
      deviceName,
      deviceType,
    });
  }, [deviceId, deviceName, deviceType]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<BasicDetailsForm>({
    defaultValues: {
      deviceId,
      deviceName,
      deviceType
    }
  });

  useEffect(() => {
    // Generate a random 16-digit ID if not already set
    if (!deviceId) {
      const generateDeviceId = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let id = '';
        for (let i = 0; i < 16; i++) {
          if (i > 0 && i % 4 === 0) id += '-';
          id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
      };
      const newDeviceId = generateDeviceId();
      setDeviceId(newDeviceId);
      setValue('deviceId', newDeviceId);
    }
  }, [deviceId, setDeviceId, setValue]);

  const onSubmit = (data: BasicDetailsForm) => {
    saveBasicDetails(data);
    console.log('Saving Basic Details:', data);
    setSuccessMessage('Basic details saved successfully!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="tab-container">
      <div className="tab-header">
        <h3>Basic Details</h3>
      </div>
      <div className="tab-content">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Device Information</h4>
          </div>
          <div className="grid">
            <div className="form-group">
              <label htmlFor="deviceId">Device ID</label>
              <input
                id="deviceId"
                type="text"
                value={deviceId}
                disabled
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="deviceName">Device Name</label>
              <input
                id="deviceName"
                type="text"
                {...register('deviceName', {
                  required: 'Device name is required',
                  pattern: {
                    value: /^[a-zA-Z0-9\s-]{3,50}$/,
                    message: 'Device name must be 3-50 characters and can only contain letters, numbers, spaces, and hyphens'
                  }
                })}
                className={`form-control ${errors.deviceName ? 'error' : ''}`}
              />
              {errors.deviceName && (
                <span className="error-message">{errors.deviceName.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="deviceType">Device Type</label>
              <select
                id="deviceType"
                {...register('deviceType', {
                  required: 'Device type is required'
                })}
                className={`form-control ${errors.deviceType ? 'error' : ''}`}
              >
                <option value="">Select Device Type</option>
                {deviceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.deviceType && (
                <span className="error-message">{errors.deviceType.message}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex-between">
          <button className="btn btn-secondary">Cancel</button>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>
            Save Changes
          </button>
        </div>
      </div>
      {successMessage && (
        <div className="alert alert-success">
          {successMessage}
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default BasicDetails;