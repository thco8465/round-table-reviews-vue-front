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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.mytitle {
  margin-bottom: 0px;
}

/* .myHeader{
  margin-bottom: 10px;
} */
.view {
  margin-top: 0px;
}
</style>
