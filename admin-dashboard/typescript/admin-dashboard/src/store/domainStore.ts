import { create } from 'zustand';
import { DomainSchema } from '../schemas/domainSchema';

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
  domain: DomainSchema | null;
  setDomain: (domain: DomainSchema) => void;
  clearDomain: () => void;
  // Add more actions as needed
  updateDomain: (updates: Partial<DomainSchema>) => void;
}

// Create Store
export const useDomainStore = create<DomainStore>((set) => ({
  domain: null,
  
  setDomain: (domain) => set({ domain }),
  
  clearDomain: () => set({ domain: null }),
  
  updateDomain: (updates) => 
    set((state) => ({
      domain: state.domain ? { ...state.domain, ...updates } : null
    }))
})); 