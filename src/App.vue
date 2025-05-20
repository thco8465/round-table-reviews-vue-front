<template>
  <div id="app">
    <MainLayout>
      <MyTitle class="mytitle" /> <!-- Title component -->
      <MyHeader class="myheader" /> <!-- Header component -->
      <router-view class="view" /> <!-- Render routed components -->
    </MainLayout>
  </div>
</template>

<script>
import { useAuthStore } from './stores/authStore'; // Import the auth store
import MyTitle from './components/MyTitle.vue';
import MyHeader from './components/MyHeader.vue';
import MainLayout from './components/MainLayout.vue';

export default {
  name: 'App',
  components: {
    MyTitle,
    MyHeader,
    MainLayout
  },
  setup() {
    const authStore = useAuthStore(); // Use the global store

    // Handle authentication state updates (function not used in this example)
    const handleAuth = (status) => {
      authStore.setAuthStatus(status); // Update the global store
    };

    return {
      handleAuth,
    };
  },
};
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  background: none; /* Avoid white default background */
  overflow-x: hidden;
}
#app {
  font-family: 'Cinzel', serif; /* Example of a medieval-inspired font */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3b2f2f;  /* dark brown text */

  background: linear-gradient(135deg, #f9f3e4, #f4e3c1);
  /* This creates a gentle transition between two warm tones */
  color: #563a28;
}



.mytitle {
  margin-bottom: 0px;
}

.view {
  margin-top: 0px;
}
</style>
