import { create } from 'zustand';

interface Domain {
  domainName: string;
  continent: string;
  country: string;
  department: string[];
}

// Validation Schema
export const domainValidationSchema = {
  domainName: {
    required: "Domain name is required",
    pattern: {
      value: /^[a-zA-Z0-9- ]+$/,
      message: "Invalid domain name"
    }
  },
  continent: {
    required: "Continent is required"
  },
  country: {
    required: "Country is required"
  },
  department: {
    required: "At least one department must be selected"
  }
};

// Store Interface
interface DomainStore {
  domain: Domain | null;
  
  setDomain: (domain: Domain) => void;
  clearDomain: () => void;
  // Add more actions as needed
  updateDomain: (updates: Partial<Domain>) => void;
}

// Create Store
export const useDomainStore = create<DomainStore>((set) => ({
  domain: null,
  
  setDomain: (domain: Domain) => set({ domain }),
  
  clearDomain: () => set({ domain: null }),
  
  updateDomain: (updates: Partial<Domain>) => 
    set((state: DomainStore) => ({
      domain: state.domain ? { ...state.domain, ...updates } : null
    }))
})); 