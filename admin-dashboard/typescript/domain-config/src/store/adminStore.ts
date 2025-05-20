import { create } from 'zustand';

interface Admin {
  name: string;
  username: string;
  email: string;
  password: string;
  gender: string;
  type: string;
  domain: string;
  department: string[];
}

interface AdminStore {
  admin: Admin | null;
  admins: Admin[];
  
  setAdmin: (admin: Admin) => void;
  clearAdmin: () => void;
  updateAdmin: (updates: Partial<Admin>) => void;
  addAdmin: (admin: Admin) => void;
  removeAdmin: (username: string) => void;
}

// Create Store
export const useAdminStore = create<AdminStore>((set) => ({
  admin: null,
  admins: [],
  
  setAdmin: (admin: Admin) => set({ admin }),
  
  clearAdmin: () => set({ admin: null }),
  
  updateAdmin: (updates: Partial<Admin>) => 
    set((state: AdminStore) => ({
      admin: state.admin ? { ...state.admin, ...updates } : null
    })),
  
  addAdmin: (admin: Admin) => 
    set((state: AdminStore) => ({
      admins: [...state.admins, admin]
    })),
  
  removeAdmin: (username: string) =>
    set((state: AdminStore) => ({
      admins: state.admins.filter((admin: Admin) => admin.username !== username)
    }))
})); 