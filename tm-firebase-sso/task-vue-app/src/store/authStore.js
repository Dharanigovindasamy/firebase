// src/store/authStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isAuthentication = ref(false);
  
  const initializeAuth = () => {
    const jwt = sessionStorage.getItem('jwt');
    isAuthentication.value = !!jwt;
    console.log('Auth initialized:', isAuthentication.value);
  };

  const setAuthentication = (status) => {
    isAuthentication.value = status;
    console.log('Auth status set to:', isAuthentication.value);
  };

  const checkAuthStatus = () => {
    const jwt = sessionStorage.getItem('jwt');
    return !!jwt;
  };

  const logout = () => {
    isAuthentication.value = false;
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userId');
  };

  // Initialize auth state when store is created
  initializeAuth();

  return {
    isAuthentication,
    setAuthentication,
    logout,
    initializeAuth,
    checkAuthStatus
  };
});
