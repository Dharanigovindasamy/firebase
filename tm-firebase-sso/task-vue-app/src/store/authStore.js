// src/stores/authStore.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthentication: false,
  }),
  actions: {
    setAuthentication(status) {
      this.isAuthentication = status;
    },
  },
});
