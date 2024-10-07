<template>
  <header class="header">
    <nav class="nav">
      <ul class="navList">
        <li class="navItem">
          <router-link to="/Home">
            <FontAwesomeIcon icon="fas fa-home" class="faIcon" /> Home
          </router-link>
        </li>
        <li class="navItem">
          <router-link to="/GameSearch">
            <FontAwesomeIcon icon="fas fa-gamepad" class="faIcon" /> Find reviews By game title
          </router-link>
        </li>
        <li class="navItem">
          <router-link to="/UserSearch">
            <FontAwesomeIcon icon="fas fa-user" class="faIcon" /> Find reviews By user
          </router-link>
        </li>
        <li class="navItem">
          <router-link to="/AddReview">
            <FontAwesomeIcon icon="fas fa-plus" class="faIcon" /> Add Review
          </router-link>
        </li>
        <li class="navItem">
          <router-link to="/MyProfile">
            <FontAwesomeIcon icon="fas fa-user-circle" class="faIcon" /> Profile
          </router-link>
        </li>
        <li class="navItem">
          <router-link to="/AddFriend">
            <FontAwesomeIcon icon="fas fa-user-plus" class="faIcon" /> Add Friend
          </router-link>
        </li>
        <li class="navItem">
          <router-link to="/Friendlist">
            <FontAwesomeIcon icon="fas fa-users" class="faIcon" /> Friend List Status
          </router-link>
        </li>
        <!-- Sign out option if authenticated -->
        <li v-if="authStore.isAuthenticated" class="navItem signOutItem">
          <a href="#" @click.prevent="handleSignOut" class="signOutLink">
            <FontAwesomeIcon icon="fas fa-sign-out-alt" />
            Sign Out
          </a>
        </li>
        <li v-else class="navItem">
          <router-link to="/SignIn">
            <FontAwesomeIcon icon="fas fa-sign-in-alt" /> Sign In
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome, faGamepad, faUser, faPlus, faUserCircle, faUserPlus, faUsers, faSignOutAlt, faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from '../stores/authStore'; // Import authStore

// Add the icons to the library
library.add(faHome, faGamepad, faUser, faPlus, faUserCircle, faUserPlus, faUsers, faSignOutAlt, faSignInAlt);

export default {
  name: 'MyHeader',
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const authStore = useAuthStore(); // Use the global store

    const handleSignOut = () => {
      authStore.setAuthStatus(false); // Sign out and update the store
    };

    return {
      authStore,
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
  