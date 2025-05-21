import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { validateAdminForm } from '../../schemas/adminSchema';
import { AdminType, Gender } from '../../types/admin';
import { useAdminStore } from '../../store/adminStore';
import { useDomainStore } from '../../store/domainStore';
import './AdminForm.css';

interface FormValues {
  name: string;
  username: string;
  email: string;
  password: string;
  gender: Gender;
  type: AdminType;
  domain: string;
  department: string[];
}

const AdminForm = () => {
  const { domain } = useDomainStore();
  const { setAdmin, addAdmin } = useAdminStore();
  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset
  } = useForm<FormValues>();

  const selectedType = watch('type');
  const selectedDomain = watch('domain');

  useEffect(() => {
    console.log("Current Domain from Store:", domain);
  }, [domain]);

  useEffect(() => {
    if (selectedDomain && domain) {
      setDepartments(domain.department);
      setSelectedDepartments([]);
      setValue('department', []);
    }
  }, [selectedDomain, domain, setValue]);

  useEffect(() => {
    const unsubscribe = useAdminStore.subscribe(
      (state: any) => {
        console.log("Admin Store Updated:", state);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDepartmentChange = (department: string) => {
    const newSelectedDepartments = selectedDepartments.includes(department)
      ? selectedDepartments.filter(d => d !== department)
      : [...selectedDepartments, department];
    
    setSelectedDepartments(newSelectedDepartments);
    setValue('department', newSelectedDepartments);
  };

  const removeDepartment = (department: string) => {
    const newSelectedDepartments = selectedDepartments.filter(d => d !== department);
    setSelectedDepartments(newSelectedDepartments);
    setValue('department', newSelectedDepartments);
  };

  const onSubmit = (data: FormValues) => {
    const validationErrors = validateAdminForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    try {
      console.log("Admin Form Submitted Data:", data);
      setAdmin(data);
      console.log("Admin data stored in Zustand store:", data);
      addAdmin(data);
      console.log("Admin added to list in store");
      console.log("Current Admin Store State:", useAdminStore.getState());

      // Show success message
      setSuccessMessage("Admin added successfully!");
      setFormErrors({});
      alert("Admin added successfully!");
      console.log("Admin added successfully!");

      // Reset form
      reset();
      setSelectedDepartments([]);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

    } catch (error) {
      console.error("Error saving admin:", error);
      setFormErrors({
        submit: "Failed to save admin. Please try again."
      });
      setSuccessMessage(null);
    }
  };

  if (!domain) {
    console.log("No domain configured in store");
    return (
      <div className="admin-container">
        <p>Please configure a domain first</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h2>Admin Configuration</h2>
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name">Name <span className='required'>*</span> </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={formErrors.name ? 'error' : ''}
          />
          {formErrors.name && <span className="error-message">{formErrors.name}</span>}
        </div>

        {/* Username Field */}
        <div className="form-group">
          <label htmlFor="username">Username <span className='required'>*</span> </label>
          <input
            id="username"
            type="text"
            {...register('username')}
            className={formErrors.username ? 'error' : ''}
          />
          {formErrors.username && <span className="error-message">{formErrors.username}</span>}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email {selectedType === AdminType.SUPER_ADMIN && '*'}</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={formErrors.email ? 'error' : ''}
          />
          {formErrors.email && <span className="error-message">{formErrors.email}</span>}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password <span className='required'>*</span></label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className={formErrors.password ? 'error' : ''}
          />
          {formErrors.password && <span className="error-message">{formErrors.password}</span>}
        </div>

        {/* Gender Field */}
        <div className="form-group">
          <label>Gender</label>
          <div className="radio-group">
            <label>
              <input type="radio" value={Gender.MALE} {...register('gender')} />
              Male
            </label>
            <label>
              <input type="radio" value={Gender.FEMALE} {...register('gender')} />
              Female
            </label>
            <label>
              <input type="radio" value={Gender.OTHER} {...register('gender')} />
              Other
            </label>
          </div>
          {formErrors.gender && <span className="error-message">{formErrors.gender}</span>}
        </div>

        {/* Type Field */}
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            {...register('type')}
            className={formErrors.type ? 'error' : ''}
          >
            <option value="">Select Type</option>
            <option value={AdminType.SUPER_ADMIN}>Super admin</option>
            <option value={AdminType.LOCAL_ADMIN}>Local admin</option>
            <option value={AdminType.AUDIT_ADMIN}>Audit admin</option>
          </select>
          {formErrors.type && <span className="error-message">{formErrors.type}</span>}
        </div>

        {/* Domain Field */}
        <div className="form-group">
          <label htmlFor="domain">Domain</label>
          <select
            id="domain"
            {...register('domain')}
            className={formErrors.domain ? 'error' : ''}
          >
            <option value="">Select Domain</option>
            <option value={domain.domainName}>{domain.domainName}</option>
          </select>
          {formErrors.domain && <span className="error-message">{formErrors.domain}</span>}
        </div>

        {/* Department Field */}
        {departments.length > 0 && (
          <div className="form-group">
            <label>Departments</label>
            <div className="multi-select-container">
              <div className="multi-select">
                {departments.map((department) => (
                  <div
                    key={department}
                    className={`multi-select-option ${
                      selectedDepartments.includes(department) ? 'selected' : ''
                    }`}
                    onClick={() => handleDepartmentChange(department)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDepartments.includes(department)}
                      onChange={() => {}}
                    />
                    {department}
                  </div>
                ))}
              </div>
              {selectedDepartments.length > 0 && (
                <div className="selected-departments">
                  {selectedDepartments.map((department) => (
                    <div key={department} className="selected-department">
                      {department}
                      <button
                        type="button"
                        onClick={() => removeDepartment(department)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {formErrors.department && (
              <span className="error-message">{formErrors.department}</span>
            )}
          </div>
        )}

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default AdminForm;