import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useBasicDetailsStore from '../../../store/basicDetailsStore';
import { deviceConfiguration } from '../../../schemas/deviceSchema';
import './TabStyles.css';

interface BasicDetailsForm {
  deviceId: string;
  deviceName: string;
  deviceType: string;
}

const BasicDetails = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    deviceId,
    deviceName,
    deviceType,
    setDeviceId,
    saveBasicDetails
  } = useBasicDetailsStore();

  const basicDetailsSchema = deviceConfiguration.deviceConfiguration.find(
    config => config.name === 'Basic Details'
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<BasicDetailsForm>({
    defaultValues: {
      deviceId,
      deviceName,
      deviceType
    }
  });

  // Watch all form fields
  const formValues = watch();

  // Log form values whenever they change
  useEffect(() => {
    console.log('Basic Details Form Values:', {
      deviceId: formValues.deviceId,
      deviceName: formValues.deviceName,
      deviceType: formValues.deviceType
    });
  }, [formValues]);

  useEffect(() => {
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
    console.log('Submitting Basic Details:', {
      deviceId: data.deviceId,
      deviceName: data.deviceName,
      deviceType: data.deviceType
    });
    saveBasicDetails(data);
    setSuccessMessage('Basic details saved successfully!');
  };

  const generateFormFields = () => {
    if (!basicDetailsSchema) return null;

    return basicDetailsSchema.schema.map((fieldGroup, groupIndex) => {
      return fieldGroup.map((field, fieldIndex) => {
        if (field.type === 'TEXT') {
          return (
            <div key={`${groupIndex}-${fieldIndex}`} className="form-group">
              <label htmlFor={field.id}>
                {field.label}
                {field.required && <span className="required-mark">*</span>}
              </label>
              <input
                id={field.id}
                type="text"
                disabled={field.disabled}
                placeholder={field.placeholder}
                {...register(field.id as keyof BasicDetailsForm, {
                  required: field.required ? `${field.label} is required` : false,
                  pattern: field.validation?.pattern ? {
                    value: field.validation.pattern,
                    message: field.validation.patternMessage || 'Invalid format'
                  } : undefined
                })}
                className={errors[field.id as keyof BasicDetailsForm] ? 'error' : ''}
              />
              {errors[field.id as keyof BasicDetailsForm] && (
                <span className="error-message">
                  {errors[field.id as keyof BasicDetailsForm]?.message}
                </span>
              )}
            </div>
          );
        } else if (field.type === 'list') {
          return (
            <div key={`${groupIndex}-${fieldIndex}`} className="form-group">
              <label htmlFor={field.id}>
                {field.label}
                {field.required && <span className="required-mark">*</span>}
              </label>
              <select
                id={field.id}
                {...register(field.id as keyof BasicDetailsForm, {
                  required: field.required ? `${field.label} is required` : false
                })}
                className={errors[field.id as keyof BasicDetailsForm] ? 'error' : ''}
              >
                <option value="">Select {field.label}</option>
                {field.options?.map((option) => (
                  <option key={option.name} value={option.name}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors[field.id as keyof BasicDetailsForm] && (
                <span className="error-message">
                  {errors[field.id as keyof BasicDetailsForm]?.message}
                </span>
              )}
            </div>
          );
        }
        return null;
      });
    });
  };

  return (
    <div className="tab-container">
      <div className="tab-header">
        <h3>{basicDetailsSchema?.name || 'Basic Details'}</h3>
      </div>
      <div className="tab-content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid">
            {generateFormFields()}
          </div>
          <div className="flex-between">
            <button type="button" className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
      {successMessage && (
        <div className="alert alert-success">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default BasicDetails;