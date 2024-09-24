<template>
    <header :class="styles.header">
      <nav :class="styles.nav">
        <ul :class="styles.navList">
          <li :class="styles.navItem">
            <router-link to="/home">
              <FontAwesomeIcon :icon="['fas', 'home']" :class="styles.faIcon" /> Home
            </router-link>
          </li>
          <li :class="styles.navItem">
            <router-link to="/reviewByGame">
              <FontAwesomeIcon :icon="['fas', 'gamepad']" :class="styles.faIcon" /> Find reviews By game title
            </router-link>
          </li>
          <li :class="styles.navItem">
            <router-link to="/reviewByUser">
              <FontAwesomeIcon :icon="['fas', 'user']" :class="styles.faIcon" /> Find reviews By user
            </router-link>
          </li>
          <li :class="styles.navItem">
            <router-link to="/add-review">
              <FontAwesomeIcon :icon="['fas', 'plus']" :class="styles.faIcon" /> Add Review
            </router-link>
          </li>
          <li :class="styles.navItem">
            <router-link to="/profile">
              <FontAwesomeIcon :icon="['fas', 'user-circle']" :class="styles.faIcon" /> Profile
            </router-link>
          </li>
          <li :class="styles.navItem">
            <router-link to="/addFriend">
              <FontAwesomeIcon :icon="['fas', 'user-plus']" :class="styles.faIcon" /> Add Friend
            </router-link>
          </li>
          <li :class="styles.navItem">
            <router-link to="/friendlist">
              <FontAwesomeIcon :icon="['fas', 'users']" :class="styles.faIcon" /> Friend List Status
            </router-link>
          </li>
          <li v-if="isAuthenticated" :class="[styles.navItem, styles.signOutItem]">
            <router-link to="/sign-in" @click="handleSignOut" :class="styles.signOutLink">
              <FontAwesomeIcon :icon="['fas', 'sign-out-alt']" />
              Sign Out
            </router-link>
          </li>
          <li v-else :class="styles.navItem">
            <router-link to="/sign-in">
              <FontAwesomeIcon :icon="['fas', 'sign-in-alt']" /> Sign In
            </router-link>
          </li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script lang="ts">
  import { ref, onMounted } from 'vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  
  export default {
    components: {
      FontAwesomeIcon,
    },
    setup() {
      const isAuthenticated = ref(false);
  
      onMounted(() => {
        const token = localStorage.getItem('token');
        isAuthenticated.value = Boolean(token); // Update authentication state based on token presence
      });
  
      const handleSignOut = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        isAuthenticated.value = false; // Update authentication state
        // Redirect to sign-in page using Vue Router
        window.location.href = '/sign-in';
      };
  
      return {
        isAuthenticated,
        handleSignOut,
      };
    },
  };
  </script>
  
  <style scoped>
/* Fantasy Adventure Theme */
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Uncial+Antiqua&display=swap');

body {
  font-family: 'Cinzel', serif;
}
/* Main header styling */
.header {
  background-size: cover;
  background-color: #f4e3c1; /* Parchment-like background */
  border: 5px solid #B08D57;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6); /* Shadow for a dramatic effect */
  
  /* Gold border resembling an ancient frame */
  padding: 10px 20px;
  border-radius: 12px;
  
}

/* Navigation bar */
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* List styling */
.navList {
  list-style: none;
  display: flex;
  gap: 20px;
  font-family: 'Cinzel', serif;
  /* A medieval-style font */
  font-size: 1.2rem;
}

/* Navigation items */
.navItem a {
  color: #563A28;
  font-weight: bold;
  /* Dark brown medieval tone */
  text-decoration: none;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px;
  transition: color 0.3s ease, transform 0.3s ease;
}

/* Hover effects */
.navItem a:hover {
  color: #DAA520;
  /* Gold color on hover */
  text-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700;
  transform: scale(1.1);
}

/* Fantasy Icons (add small decorative icons before each link) */
.navItem a::before {
  /*content: url('/path-to-fantasy-icon.png');*/
  /* Replace with your icons */
  display: inline-block;
  margin-right: 8px;
  width: 20px;
  height: 20px;
}

/* Sign-out item specific styling */
.signOutItem a {
  color: #9B111E;
  /* Dark red for sign out */
}

.signOutItem a:hover {
  color: #FF6347;
  /* Lighter red on hover */
}

/* Responsive behavior */
@media (max-width: 768px) {
  .navList {
    flex-direction: column;
    gap: 10px;
  }
}  </style>
  