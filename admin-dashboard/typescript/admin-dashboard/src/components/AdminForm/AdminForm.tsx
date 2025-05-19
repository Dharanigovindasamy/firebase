import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminSchema, AdminType, Gender } from '../../schemas/adminSchema';
import { useAdminStore } from '../../store/adminStore';
import { useDomainStore } from '../../store/domainStore';
import './AdminForm.css';

const AdminForm = () => {
  const { domain } = useDomainStore();
  const { setAdmin, addAdmin } = useAdminStore();
  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(adminSchema)
  });

  const selectedType = watch('type');
  const selectedDomain = watch('domain');

  // Log when domain changes
  useEffect(() => {
    console.log("Current Domain from Store:", domain);
  }, [domain]);

  // Update departments when domain changes
  useEffect(() => {
    if (selectedDomain && domain) {
      setDepartments(domain.department);
      // Clear selected departments when domain changes
      setSelectedDepartments([]);
      setValue('department', []);
    }
  }, [selectedDomain, domain, setValue]);

  // Log store changes
  useEffect(() => {
    const unsubscribe = useAdminStore.subscribe(
      (state) => {
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

  const onSubmit = (data: any) => {
    console.log("Admin Form Submitted Data:", data);
    setAdmin(data);
    console.log("Admin data stored in Zustand store:", data);
    addAdmin(data);
    console.log("Admin added to list in store");
    console.log("Current Admin Store State:", useAdminStore.getState());
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
      
      <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name.message}</span>}
        </div>

        {/* Username Field */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            {...register('username')}
            className={errors.username ? 'error' : ''}
          />
          {errors.username && <span className="error-message">{errors.username.message}</span>}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email {selectedType === AdminType.SUPER_ADMIN && '*'}</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
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
          {errors.gender && <span className="error-message">{errors.gender.message}</span>}
        </div>

        {/* Type Field */}
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            {...register('type')}
            className={errors.type ? 'error' : ''}
          >
            <option value="">Select Type</option>
            <option value={AdminType.SUPER_ADMIN}>Super admin</option>
            <option value={AdminType.LOCAL_ADMIN}>Local admin</option>
            <option value={AdminType.AUDIT_ADMIN}>Audit admin</option>
          </select>
          {errors.type && <span className="error-message">{errors.type.message}</span>}
        </div>

        {/* Domain Field */}
        <div className="form-group">
          <label htmlFor="domain">Domain</label>
          <select
            id="domain"
            {...register('domain')}
            className={errors.domain ? 'error' : ''}
          >
            <option value="">Select Domain</option>
            <option value={domain.domainName}>{domain.domainName}</option>
          </select>
          {errors.domain && <span className="error-message">{errors.domain.message}</span>}
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
            {errors.department && (
              <p className="error-message">{errors.department.message}</p>
            )}
          </div>
        )}

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default AdminForm;
