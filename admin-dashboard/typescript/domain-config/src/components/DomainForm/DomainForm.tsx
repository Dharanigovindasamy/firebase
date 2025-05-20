import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./DomainForm.css";
import { validateDomainForm } from "../../schemas/domainSchema";
import { useDomainStore } from "../../store/domainStore";

interface FormValues {
  domainName: string;
  continent: string;
  country: string;
  department: string[];
}

interface Continent {
  name: string;
  code: string;
}

interface Country {
  name: string;
  code: string;
  continent: string;
}

// Department mapping for each country
const countryDepartments: Record<string, string[]> = {
  "India": ["Admin", "UI", "Server", "Communication", "Sales", "Management", "Testing", "Security Testing"],
  "USA": ["Admin", "UI", "Server", "Communication", "Sales", "Management", "Testing", "Security Testing", "Research"],
  "UK": ["Admin", "UI", "Server", "Communication", "Sales", "Management", "Testing", "Security Testing", "Innovation"],
  "Germany": ["Admin", "UI", "Server", "Communication", "Sales", "Management", "Testing", "Security Testing", "Engineering"],
  "France": ["Admin", "UI", "Server", "Communication", "Sales", "Management", "Testing", "Security Testing", "Design"],
  "Japan": ["Admin", "UI", "Server", "Communication", "Sales", "Management", "Testing", "Security Testing", "Quality"],
  "China": ["Admin", "UI", "Server", "Communication", "Sales", "Management", "Testing", "Security Testing", "Development"],
  "Canada": ["Admin", "UI", "Server", "Communication", "Sales", "Management", "Testing", "Security Testing", "Support"],
  "Australia": ["Admin", "UI", "Server", "Communication", "Sales", "Management", "Testing", "Security Testing", "Operations"],
  "Brazil": ["Admin", "UI", "Server", "Communication", "Sales", "Management", "Testing", "Security Testing", "Infrastructure"]
};

const DomainForm = () => {
  const { setDomain,  } = useDomainStore();
  const [, setFormErrors] = useState<Record<string, string>>({});
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [continents, setContinents] = useState<Continent[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoadingContinents, setIsLoadingContinents] = useState(false);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      domainName: "",
      continent: "",
      country: "",
      department: []
    }
  });

  const selectedContinent = watch("continent");
  const selectedCountry = watch("country");

  useEffect(() => {
    const unsubscribe = useDomainStore.subscribe(
      (state: any) => {
        console.log("Domain Store Updated:", state);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      // Update departments based on selected country
      const countryDepts = countryDepartments[selectedCountry] || [];
      setDepartments(countryDepts);
      setSelectedDepartments([]);
      setValue("department", []);
    }
  }, [selectedCountry, setValue]);

  const fetchContinents = async () => {
    if (continents.length > 0) return; // Don't fetch if already loaded
    
    setIsLoadingContinents(true);
    try {
      // Using REST Countries API for continents
      const response = await axios.get('https://restcountries.com/v3.1/all');
      console.log("continent", response.data);
      const uniqueContinents = Array.from(new Set(response.data.map((country: any) => country.region)))
        .filter((region): region is string => Boolean(region))
        .map((name) => ({ name, code: name.substring(0, 2).toUpperCase() }));
      setContinents(uniqueContinents);
    } catch (error) {
      console.error('Error fetching continents:', error);
    } finally {
      setIsLoadingContinents(false);
    }
  };

  const fetchCountries = async (continent: string) => {
    setIsLoadingCountries(true);
    try {
      // Using REST Countries API for countries
      const response = await axios.get(`https://restcountries.com/v3.1/region/${continent}`);
      const countryList = response.data.map((country: any) => ({
        name: country.name.common,
        code: country.cca2,
        continent: country.region
      }));
      console.log("countryList", countryList);
      setCountries(countryList);
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setIsLoadingCountries(false);
    }
  };

  const handleContinentClick = () => {
    fetchContinents();
  };

  const handleCountryClick = () => {
    if (selectedContinent) {
      fetchCountries(selectedContinent);
    }
  };

  const handleDepartmentChange = (department: string) => {
    const newSelectedDepartments = selectedDepartments.includes(department)
      ? selectedDepartments.filter((d) => d !== department)
      : [...selectedDepartments, department];

    setSelectedDepartments(newSelectedDepartments);
    setValue("department", newSelectedDepartments);
  };

  const removeDepartment = (department: string) => {
    const newSelectedDepartments = selectedDepartments.filter((d) => d !== department);
    setSelectedDepartments(newSelectedDepartments);
    setValue("department", newSelectedDepartments);
  };

  const onSubmit = async (data: FormValues) => {
    const validationErrors = validateDomainForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    try {
      // Store the domain data in the store
      setDomain({
        domainName: data.domainName,
        continent: data.continent,
        country: data.country,
        department: data.department
      });

      console.log("Domain data stored in Zustand store:", data);
      console.log("Current Domain Store State:", useDomainStore.getState());

      // Optional: Make API call to save data
      // const response = await axios.post("/api/domains", data);
      // console.log("Domain saved to server:", response.data);

      // Reset form after successful submission
      setValue("domainName", "");
      setValue("continent", "");
      setValue("country", "");
      setValue("department", []);
      setSelectedDepartments([]);
      setFormErrors({});

    } catch (error) {
      console.error("Error saving domain:", error);
      setFormErrors({
        submit: "Failed to save domain. Please try again."
      });
    }
  };

  return (
    <div className="domain-container">
      <h2>Domain Configuration</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="domain-form">
        {/* Domain Name Field */}
        <div className="form-group">
          <label htmlFor="domainName">Domain Name</label>
          <input
            id="domainName"
            type="text"
            {...register("domainName", {
              required: "Domain name is required",
              pattern: {
                value: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid domain name (e.g., example.com)"
              }
            })}
            className={errors.domainName ? "error" : ""}
          />
          {errors.domainName && (
            <span className="error-message">{errors.domainName.message}</span>
          )}
        </div>

        {/* Continent Field */}
        <div className="form-group">
          <label htmlFor="continent">Continent</label>
          <select
            id="continent"
            {...register("continent", { required: "Continent is required" })}
            className={errors.continent ? "error" : ""}
            onClick={handleContinentClick}
            disabled={isLoadingContinents}
          >
            <option value="">Select Continent</option>
            {continents.map((continent) => (
              <option key={continent.code} value={continent.name}>
                {continent.name}
              </option>
            ))}
          </select>
          {isLoadingContinents && <span className="loading">Loading continents...</span>}
          {errors.continent && (
            <span className="error-message">{errors.continent.message}</span>
          )}
        </div>

        {/* Country Field */}
        {selectedContinent && (
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              {...register("country", { required: "Country is required" })}
              className={errors.country ? "error" : ""}
              onClick={handleCountryClick}
              disabled={isLoadingCountries}
            >
              <option value="">Select Country</option>
              {countries
                .filter(country => country.continent === selectedContinent)
                .map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
            </select>
            {isLoadingCountries && <span className="loading">Loading countries...</span>}
            {errors.country && (
              <span className="error-message">{errors.country.message}</span>
            )}
          </div>
        )}

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
                      selectedDepartments.includes(department) ? "selected" : ""
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
              <span className="error-message">{errors.department.message}</span>
            )}
          </div>
        )}

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DomainForm;
