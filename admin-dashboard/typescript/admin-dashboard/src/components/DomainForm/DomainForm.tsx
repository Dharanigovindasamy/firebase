import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./DomainForm.css";
import { DomainSchema, domainValidationSchema } from "../../schemas/domainSchema";
import { useDomainStore } from "../../store/domainStore";

// Static mapping for departments based on country or continent
const departmentMapping: Record<string, string[]> = {
  Asia: ["Admin", "UI", "Server", "Sales"],
  Europe: ["Testing", "Security testing", "Management"],
  "North America": ["Communication", "Sales", "Admin"],
  "United States": ["Server", "Management", "Security testing"],
  India: ["Admin", "UI", "Server"],
  Germany: ["Testing", "Security testing"],
};

const DomainForm = () => {
  const { setDomain } = useDomainStore();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DomainSchema>();

  const [continents, setContinents] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const selectedContinent = watch("continent");
  const selectedCountry = watch("country");

  // Fetch continents (static or from country API)
  useEffect(() => {
    const fetchContinents = async () => {
      try {
        const res = await axios.get("https://restcountries.com/v3.1/all");
        console.log("continents", res.data);
        const uniqueContinents = Array.from(
          new Set(res.data.map((c: any) => c.region).filter((r: string) => r))
        ) as string[];
        setContinents(uniqueContinents);
      } catch (err) {
        console.error("Failed to fetch continents", err);
      }
    };
    fetchContinents();
  }, []);

  // Fetch countries for selected continent
  useEffect(() => {
    if (selectedContinent) {
      const fetchCountries = async () => {
        try {
          const res = await axios.get(
            `https://restcountries.com/v3.1/region/${selectedContinent}`
          );
            console.log(res.data);
          const countryNames = res.data.map((c: any) => c.name.common);
          setCountries(countryNames.sort());
          console.log("countries", countryNames); 
        } catch (err) {
          console.error("Failed to fetch countries", err);
        }
      };
      fetchCountries();
    }
  }, [selectedContinent]);

  // Set departments based on country or continent
  useEffect(() => {
    if (selectedCountry && departmentMapping[selectedCountry]) {
      setDepartments(departmentMapping[selectedCountry]);
    } else if (selectedContinent && departmentMapping[selectedContinent]) {
      setDepartments(departmentMapping[selectedContinent]);
    } else {
      setDepartments([]);
    }
    // Clear selected departments when country/continent changes
    setSelectedDepartments([]);
    setValue('department', []);
  }, [selectedCountry, selectedContinent, setValue]);

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

  const onSubmit = (data: DomainSchema) => {
    console.log("Domain Form Submitted Data:", data);
    setDomain(data);
    console.log("Domain data stored in Zustand store:", data);
    console.log("Current Domain Store State:", useDomainStore.getState());
    alert(JSON.stringify(data, null, 2));
    reset();
    setSelectedDepartments([]);
  };

  // Add effect to log store changes
  useEffect(() => {
    const unsubscribe = useDomainStore.subscribe(
      (state) => {
        console.log("Domain Store Updated:", state);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="form-container">
      <h2 className="form-title">Domain Configuration Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="form-label">Domain Name</label>
          <input
            className="form-input"
            {...register("domainName", domainValidationSchema.domainName)}
            placeholder="Enter domain name"
          />
          {errors.domainName && (
            <p className="error-message">{errors.domainName.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Continent</label>
          <select 
            className="form-select" 
            {...register("continent", domainValidationSchema.continent)}
          >
            <option value="">Select continent</option>
            {continents.map((continent) => (
              <option key={continent} value={continent}>
                {continent}
              </option>
            ))}
          </select>
          {errors.continent && (
            <p className="error-message">{errors.continent.message}</p>
          )}
        </div>

        {selectedContinent && (
          <div className="form-group">
            <label className="form-label">Country</label>
            <select 
              className="form-select" 
              {...register("country", domainValidationSchema.country)}
            >
              <option value="">Select country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="error-message">{errors.country.message}</p>
            )}
          </div>
        )}

        {departments.length > 0 && (
          <div className="form-group">
            <label className="form-label">Departments</label>
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

        <button className="submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DomainForm;
