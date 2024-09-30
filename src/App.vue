<template>
  <div id="app">
    <MyTitle :isAuthenticated="isAuthenticated" /> <!-- Pass isAuthenticated as prop -->
    <MyHeader :isAuthenticated="isAuthenticated" @authenticated="handleAuth" /> <!-- Pass isAuthenticated and listen for event -->
    <router-view /> <!-- Always render routed components -->
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import MyTitle from './components/MyTitle.vue';
import MyHeader from './components/MyHeader.vue';

export default {
  name: 'App',
  components: {
    MyTitle,
    MyHeader,
  },
  setup() {
    const isAuthenticated = ref(Boolean(localStorage.getItem('token'))); // Initialize based on token

    // Function to handle authentication state
    const handleAuth = (status) => {
      isAuthenticated.value = status;
      if (!status) {
        localStorage.removeItem('token'); // Remove the token upon sign out
      }
    };

    // Watch for changes in isAuthenticated
    watch(isAuthenticated, (newStatus) => {
      console.log('Authentication status changed:', newStatus);
    });
    watch(
      () => localStorage.getItem('token'),
      (newToken) => {
        isAuthenticated.value = Boolean(newToken);
      }
    );
    return {
      isAuthenticated,
      handleAuth,
    };
  },
};
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
