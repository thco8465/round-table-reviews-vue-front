<template>
  <div class="container">
    <div class="user-info">
      <p v-if="username">Welcome, {{ username }}!</p>
    </div>
    <h1 class="title">{{ titleText }}</h1>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';

// Function to fetch user data
const fetchUserData = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token found");

    const response = await fetch(`${process.env.VUE_APP_API_URL}/api/user/me`, {
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
  name: 'MyTitle',
  props: {
    text: {
      type: String,
      default: `Round Table Reviews`,
    },
    isAuthenticated: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const username = ref(null); // Initialize as null
    const titleText = ref(props.text); // Reference the prop text

    const loadUserData = async () => {
      const userData = await fetchUserData();
      if (userData) {
        username.value = userData.username;
      } else {
        username.value = null; // Reset username on failure
      }
    };

    // Watch for authentication changes to fetch user data
    watch(() => props.isAuthenticated, (newValue) => {
      if (newValue) {
        loadUserData(); // Fetch user data on authentication
      } else {
        username.value = null; // Reset if not authenticated
      }
    });

    return {
      username,
      titleText
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
  background-size: cover;
  border: 5px solid #B08D57;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6); /* Shadow for a dramatic effect */  
  /* Gold border resembling an ancient frame */
  padding: 10px 20px;
  border-radius: 12px;
}

.title {
  font-family: 'Cinzel', serif; /* Example of a medieval-inspired font */
  font-size: 2.5rem; /* Adjusted size for better fit */
  color: #d4af37; /* Gold color for a medieval look */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6); /* Shadow for a dramatic effect */
  margin: 0;
  text-align: center;
  text-justify: center;
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
  