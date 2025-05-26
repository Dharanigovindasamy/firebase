import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './AdvancedConfiguration.css';
import useBasicDetailsStore from '../../../store/basicDetailsStore';
import { deviceConfiguration } from '../../../schemas/deviceSchema';

interface AdvancedConfigForm {
  enableLogging: boolean;
  logLevel: string;
  locationTag: string;
  assignedUser: string;
  qosProfile: string;
  timezone: string;
  rebootSchedule: string;
}

const logLevels = ['Error', 'Warning', 'Info', 'Debug'];
const qosProfiles = ['High', 'Medium', 'Low'];
const timezones = [
  'UTC+01:00',
  'UTC+02:00',
  'UTC+03:00',
  'UTC+04:00',
  'UTC+05:00',
  'UTC+06:00',
  'UTC+07:00',
  'UTC+08:00',
  'UTC+09:00',
  'UTC+10:00',
  'UTC+11:00',
  'UTC+12:00',
  'UTC-01:00',
  'UTC-02:00',
  'UTC-03:00',
  'UTC-04:00',
  'UTC-05:00',
  'UTC-06:00',
  'UTC-07:00',
  'UTC-08:00',
  'UTC-09:00',
  'UTC-10:00',
  'UTC-11:00',
  'UTC-12:00',
  'PST',
  'EST',
  'CST',
  'MST'
];

// Sample user list
const users = [
  'Surthi',
  'Divya',
  'Samuthira',
  'Pavithra',
  'Kaviya',
  'Kirubha',
  'Dharani',
  'Dharshini',
  'sanmathi',
  'Preethi'
];

const AdvancedConfiguration = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { deviceType } = useBasicDetailsStore();
  const isWifiPhone = deviceType?.toLowerCase() === 'wifiphone';

  const {
    register,
    handleSubmit,
   // watch,
    formState: { errors }
  } = useForm<AdvancedConfigForm>({
    defaultValues: {
      enableLogging: false,
      logLevel: 'Error',
      qosProfile: 'Medium'
    }
  });

  //const deviceType = watch('deviceType');
 // const enableLogging = watch('enableLogging');

  // Find the Location Tag field schema
  const advancedConfigSchema = deviceConfiguration.deviceConfiguration.find(cfg => cfg.name === 'Advanced Configuration');
  const locationTagField = advancedConfigSchema?.schema.flat().find(field => field.id === 'locationTag');
  const timezoneField = advancedConfigSchema?.schema.flat().find(field => field.id === 'timezone');
  const rebootScheduleField = advancedConfigSchema?.schema.flat().find(field => field.id === 'rebootSchedule');

  let locationTagRequired = false;
  let locationTagDisabled = false;
  if (locationTagField?.conditionalMandatory) {
    const condVal = locationTagField.conditionalMandatoryValue;
    if (Array.isArray(condVal)) {
      locationTagRequired = condVal.includes(deviceType?.toLowerCase());
      locationTagDisabled = !locationTagRequired;
    } else {
      locationTagRequired = condVal === deviceType?.toLowerCase();
      locationTagDisabled = !locationTagRequired;
    }
  } else {
    locationTagRequired = !!locationTagField?.required;
    locationTagDisabled = false;
  }

  let timezoneRequired = false;
  let timezoneDisabled = false;
  if (timezoneField?.conditionalMandatory) {
    const condVal = timezoneField.conditionalMandatoryValue;
    if (Array.isArray(condVal)) {
      timezoneRequired = condVal.includes(deviceType?.toLowerCase());
      timezoneDisabled = !timezoneRequired;
    } else {
      timezoneRequired = condVal === deviceType?.toLowerCase();
      timezoneDisabled = !timezoneRequired;
    }
  } else {
    timezoneRequired = !!timezoneField?.required;
    timezoneDisabled = false;
  }

  let rebootScheduleRequired = false;
  let rebootScheduleDisabled = false;
  if (rebootScheduleField?.conditionalMandatory) {
    const condVal = rebootScheduleField.conditionalMandatoryValue;
    if (Array.isArray(condVal)) {
      rebootScheduleRequired = condVal.includes(deviceType?.toLowerCase());
      rebootScheduleDisabled = !rebootScheduleRequired;
    } else {
      rebootScheduleRequired = condVal === deviceType?.toLowerCase();
      rebootScheduleDisabled = !rebootScheduleRequired;
    }
  } else {
    rebootScheduleRequired = !!rebootScheduleField?.required;
    rebootScheduleDisabled = false;
  }

  const onSubmit = (data: AdvancedConfigForm) => {
    console.log('Advanced Configuration Form Data:', data);
    setSuccessMessage('Advanced configuration saved successfully!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="advanced-configuration">
      <h3>Advanced Configuration</h3>
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              {...register('enableLogging', {
                required: isWifiPhone ? 'Enable Logging is required for Wifi phones' : false,
                disabled: !isWifiPhone
              })}
            />
            Enable Logging
            {isWifiPhone && <span className="required-mark">*</span>}
          </label>
          {errors.enableLogging && (
            <span className="error-message">{errors.enableLogging.message}</span>
          )}
        </div>

        {isWifiPhone && (
          <div className="form-group">
            <label htmlFor="logLevel">Log Level</label>
            <select
              id="logLevel"
              {...register('logLevel', {
                required: 'Log level is required'
              })}
              className={errors.logLevel ? 'error' : ''}
            >
              {logLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.logLevel && (
              <span className="error-message">{errors.logLevel.message}</span>
            )}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="locationTag">Location Tag
            {locationTagRequired && <span className="required-mark">*</span>}
          </label>
          <input
            id="locationTag"
            type="text"
            placeholder="e.g., Floor 2 - South Wing"
            disabled={locationTagDisabled}
            {...register('locationTag', {
              required: locationTagRequired ? 'Location tag is required' : false
            })}
            className={errors.locationTag ? 'error' : ''}
          />
          {errors.locationTag && (
            <span className="error-message">{errors.locationTag.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="assignedUser">Assigned User</label>
          <select
            id="assignedUser"
            {...register('assignedUser', {
              required: 'Assigned user is required'
            })}
            className={errors.assignedUser ? 'error' : ''}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
          {errors.assignedUser && (
            <span className="error-message">{errors.assignedUser.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="qosProfile">QoS Profile</label>
          <select
            id="qosProfile"
            {...register('qosProfile', {
              required: 'QoS profile is required'
            })}
            className={errors.qosProfile ? 'error' : ''}
          >
            {qosProfiles.map((profile) => (
              <option key={profile} value={profile}>
                {profile}
              </option>
            ))}
          </select>
          {errors.qosProfile && (
            <span className="error-message">{errors.qosProfile.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="timezone">Timezone
            {timezoneRequired && <span className="required-mark">*</span>}
          </label>
          <select
            id="timezone"
            disabled={timezoneDisabled}
            {...register('timezone', {
              required: timezoneRequired ? 'Timezone is required' : false
            })}
            className={errors.timezone ? 'error' : ''}
          >
            <option value="">Select Timezone</option>
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
          {errors.timezone && (
            <span className="error-message">{errors.timezone.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="rebootSchedule">Reboot Schedule
            {rebootScheduleRequired && <span className="required-mark">*</span>}
          </label>
          <input
            id="rebootSchedule"
            type="time"
            disabled={rebootScheduleDisabled}
            {...register('rebootSchedule', {
              required: rebootScheduleRequired ? 'Reboot schedule is required' : false
            })}
            className={errors.rebootSchedule ? 'error' : ''}
          />
          {errors.rebootSchedule && (
            <span className="error-message">{errors.rebootSchedule.message}</span>
          )}
        </div>

        <button type="submit" className="submit-button">
          Save Advanced Configuration
        </button>
      </form>
    </div>
  );
};

export default AdvancedConfiguration; 