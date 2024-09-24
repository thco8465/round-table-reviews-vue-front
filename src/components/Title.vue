<template>
    <div :class="styles.container">
      <div :class="styles['user-info']">
        <p v-if="username">Welcome, {{ username }}!</p>
      </div>
      <h1 :class="styles.title">{{ titleText }}</h1>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import styles from './title.module.css'; // Adjust the path if necessary
  
  interface User {
    username: string;
  }
  
  const fetchUserData = async (): Promise<User | null> => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return { username: data.username }; // Extract the fields you need
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };
  
  export default defineComponent({
    name: 'Title',
    props: {
      text: {
        type: String,
        default: `Knight's Critique`,
      },
    },
    setup(props) {
      const username = ref<string | null>(null);
      const titleText = props.text;
  
      const loadUserData = async () => {
        const userData = await fetchUserData();
        if (userData) {
          username.value = userData.username;
        }
      };
  
      onMounted(() => {
        loadUserData();
      });
  
      return {
        username,
        titleText,
        styles,
      };
    },
  });
  </script>
  
  <style scoped>
.container {
  background-color: #6F4F28; /* Semi-transparent background */
  border-radius: 5px;
  height: auto; /* Adjusted to fit content dynamically */
  max-height: 150px; /* Set a maximum height if needed */
  padding: 10px; /* Add padding to ensure content is not too close to edges */
  overflow: hidden; /* Hide overflow to keep the container tidy */
}

.title {
  font-family: 'Cinzel', serif; /* Example of a medieval-inspired font */
  font-size: 2.5rem; /* Adjusted size for better fit */
  color: #d4af37; /* Gold color for a medieval look */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6); /* Shadow for a dramatic effect */
  margin: 0;
  text-align: center;
}

.user-info {
  text-align: right;
  font-family: 'Uncial Antiqua', serif; /* Another medieval-inspired font */
  font-size: 1.2rem; /* Adjusted size for better fit */
  color: #d4af37; /* White text for contrast */
  margin-bottom: 10px; /* Reduced margin for a compact look */
  padding: 5px;
  border-radius: 5px;
}

/* Optional: Add some medieval-inspired border or decoration */
.container::before {
  content: "";
  display: block;
  width: 100%;
  height: 5px;
  /*background: url('path-to-your-medieval-border.png') no-repeat center center;*/
  background-size: cover;
  margin-bottom: 20px;
}
</style>
  