<template>
  <header class="header">
    <!-- Warning message appears when the user isn’t signed in -->
    <div class="warning-message" v-if="showSigninWarning">
      Please sign in or create account to access.
    </div>
    <div class="nav-lip">
      <span class="drop-arrow">▼</span>
    </div>
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
          <template v-if="authStore.isAuthenticated">
            <router-link to="/AddReview">
              <FontAwesomeIcon icon="fas fa-plus" class="faIcon" /> Add Review
            </router-link>
          </template>
          <template v-else>
            <a href="#" @click.prevent="notifySignIn">
              <FontAwesomeIcon icon="fas fa-plus" class="faIcon" /> Add Review
            </a>
          </template>
        </li>
        <li class="navItem">
          <!-- Protected route: if user is not signed in, clicking triggers a warning -->
          <template v-if="authStore.isAuthenticated">
            <router-link to="/MyProfile">
              <FontAwesomeIcon icon="fas fa-user-circle" class="faIcon" /> Profile
            </router-link>
          </template>
          <template v-else>
            <a href="#" @click.prevent="notifySignIn">
              <FontAwesomeIcon icon="fas fa-user-circle" class="faIcon" /> Profile
            </a>
          </template>
        </li>
        <!-- <li class="navItem">
          <template v-if="authStore.isAuthenticated">
            <router-link to="/MyFriends">
              <FontAwesomeIcon icon="fas fa-user-plus" class="faIcon" /> My Friends
            </router-link>
          </template>
          <template v-else>
            <a href="#" @click.prevent="notifySignIn">
              <FontAwesomeIcon icon="fas fa-user-plus" class="faIcon" /> My Friends
            </a>
          </template>
        </li> -->
        <li class="navItem">
          <template v-if="authStore.isAuthenticated">
            <router-link to="/AddFriend">
              <FontAwesomeIcon icon="fas fa-user-plus" class="faIcon" /> Add Friend
            </router-link>
          </template>
          <template v-else>
            <a href="#" @click.prevent="notifySignIn">
              <FontAwesomeIcon icon="fas fa-user-plus" class="faIcon" /> Add Friend
            </a>
          </template>
        </li>
        <li class="navItem">
          <template v-if="authStore.isAuthenticated">
            <router-link to="/Friendlist">
              <FontAwesomeIcon icon="fas fa-users" class="faIcon" /> Friend List Status
            </router-link>
          </template>
          <template v-else>
            <a href="#" @click.prevent="notifySignIn">
              <FontAwesomeIcon icon="fas fa-users" class="faIcon" /> Friend List Status
            </a>
          </template>
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
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faGamepad,
  faUser,
  faPlus,
  faUserCircle,
  faUserPlus,
  faUsers,
  faSignOutAlt,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from '../stores/authStore';

// Add the icons to the library
library.add(
  faHome,
  faGamepad,
  faUser,
  faPlus,
  faUserCircle,
  faUserPlus,
  faUsers,
  faSignOutAlt,
  faSignInAlt
);

export default {
  name: 'MyHeader',
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const authStore = useAuthStore();
    const showSigninWarning = ref(false);
    const handleSignOut = () => {
      authStore.setAuthStatus(false);
    };
    const notifySignIn = () => {
      showSigninWarning.value = true;
      setTimeout(() => {
        showSigninWarning.value = false;
      }, 2000);
    }

    return {
      authStore,
      handleSignOut,
      showSigninWarning,
      notifySignIn
    };
  },
};
</script>
<style scoped>
/* Import fonts */
@import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Uncial+Antiqua&display=swap");

body {
  font-family: "Cinzel", serif;
}

/* Fluid header container */
.header {
  width: 100%;
  box-sizing: border-box;
  background-color: #f4e3c1;
  border: 5px solid #b08d57;
  border-top: none;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  transition: border 0.3s ease, padding 0.3s ease;
  /* To smooth the border change */
  overflow: hidden;
  border-radius: 0px 0px 5px 5px;
}

/* Warning message styling */
.warning-message {
  background-color: #ffdddd;
  color: #a94442;
  padding: 10px;
  text-align: center;
  border: 1px solid #a94442;
  border-radius: 5px;
  margin-bottom: 10px;
}

/* The visible "lip" of the header with the down arrow */
.nav-lip {
  height: 30px;
  text-align: center;
  cursor: pointer;
  background-color: #f4e3c1;
}

/* Down arrow indicator, rotates on hover */
.drop-arrow {
  font-size: 1.5rem;
  display: inline-block;
  transition: transform 0.3s ease;
}

/* Navigation dropdown structure */
.nav {
  overflow-y: auto; /* Enables vertical scroll if needed */
  overflow-x: hidden;
  max-height: 0;
  transition: max-height 0.3s ease;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
}


/* Expand nav (and header border) when hovering over the header */
.header:hover .nav {
  max-height: 200px; /* Adjust based on content height */
}

/* Rotate arrow upon expansion */
.header:hover .drop-arrow {
  transform: rotate(180deg);
}

/* Navigation list styling: horizontal layout by default */
.navList {
  list-style: none;
  display: flex;
  gap: 20px;
  font-family: "Cinzel", serif;
  font-size: 1.2rem;
  justify-content: center;
  padding: 10px;
  margin: 0;
}

/* Navigation link styling */
.navItem a {
  color: #563a28;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px;
  transition: color 0.3s ease, transform 0.3s ease;
}

.navItem a:hover {
  color: #daa520;
  text-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700;
  transform: scale(1.1);
}

/* Sign-out specific styling */
.signOutItem a {
  color: #9b111e;
}

.signOutItem a:hover {
  color: #ff6347;
}

/* Responsive adjustments using media queries */
@media (max-width: 768px) {
  /* Make header less padded and reduce border thickness */
  .header {
    padding: 10px;
    border-width: 3px;
  }
  /* Stack navigation items vertically */
  .navList {
    flex-direction: column;
    gap: 10px;
  }
  /* Adjust link padding and font size for smaller screens */
  .navItem a {
    padding: 8px;
    font-size: 1rem;
  }
  /* Scale down the arrow size */
  .drop-arrow {
    font-size: 1.2rem;
  }
  /* Optionally, increase nav container height if needed */
  .header:hover .nav {
    max-height: 300px;
  }
}
</style>
