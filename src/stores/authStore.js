import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(Boolean(localStorage.getItem('token'))); // Initialize based on localStorage token

  const setAuthStatus = (status) => {
    isAuthenticated.value = status;
    if (!status) {
      localStorage.removeItem('token'); // Clear token on sign out
    }
  };

  return {
    isAuthenticated,
    setAuthStatus,
  };
});
