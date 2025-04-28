// src/stores/adminStore.js

import { defineStore } from "pinia";
import { reactive } from "vue";
import { addAdmin } from "@/service/admin/addAdmin";    
import { getAdmin } from "@/service/admin/getAdmin";   

// ✅ rename `AdminStore` to `useAdminStore` (Pinia convention)
export const useAdminStore = defineStore("admin", () => {
  const state = reactive({
    admin: null,
  });

  const setAdmin = (adminData) => {
    state.admin = adminData;
  };

  const createAdmin = async (adminData) => {
    try {
      const response = await addAdmin(adminData);
      state.admin = response;
      console.log("Admin created successfully in store", response);
    } catch (error) {
      console.error("Error creating admin in store", error);
    }
  };

  const retrieveAdmin = async () => {
    try {
      const response = await getAdmin();
      state.admin = response;
      console.log("Admin retrieved successfully in store", response);
    } catch (error) {
      console.error("Error retrieving admin in store", error);
    }
  };

  return {
    state,
    setAdmin,
    createAdmin,
    retrieveAdmin,
  };
});
