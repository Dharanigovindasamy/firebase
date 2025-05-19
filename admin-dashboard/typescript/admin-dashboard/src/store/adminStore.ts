import { create } from 'zustand';
import { AdminSchema } from '../schemas/adminSchema';

// Store Interface
interface AdminStore {
  admin: AdminSchema | null;
  setAdmin: (admin: AdminSchema) => void;
  clearAdmin: () => void;
  updateAdmin: (updates: Partial<AdminSchema>) => void;
  admins: AdminSchema[];
  addAdmin: (admin: AdminSchema) => void;
  removeAdmin: (username: string) => void;
}

// Create Store
export const useAdminStore = create<AdminStore>((set) => ({
  admin: null,
  admins: [],
  
  setAdmin: (admin) => set({ admin }),
  
  clearAdmin: () => set({ admin: null }),
  
  updateAdmin: (updates) => 
    set((state) => ({
      admin: state.admin ? { ...state.admin, ...updates } : null
    })),
  
  addAdmin: (admin) => 
    set((state) => ({
      admins: [...state.admins, admin]
    })),
  
    
  removeAdmin: (username) =>
    set((state) => ({
      admins: state.admins.filter(admin => admin.username !== username)
    }))
})); 