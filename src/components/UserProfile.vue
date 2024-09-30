<template>
  <div class="profile">
    <!-- Check if user is not null before rendering -->
    <div v-if="user">
      <h1>{{ user.username }}'s Profile</h1>
      <div class="stats">
        <div class="stat" v-if="user.reviewCount !== null">
          <p>Review Count:</p>
          <p>{{ user.reviewCount }}</p>
        </div>
        <div class="stat" v-if="user.exp !== null">
          <p>Experience:</p>
          <p>{{ user.exp }}</p>
        </div>
        <div class="stat" v-if="user.level !== null">
          <p class="level">Level:</p>
          <p>{{ user.level }}</p>
        </div>
      </div>
      <div class="reviews">
        <!-- Check if reviews array is not empty -->
        <template v-if="reviews.length > 0">
          <ReviewCard v-for="review in reviews" :key="review.id" :review="review" />
        </template>
        <template v-else>
          <p>No reviews yet!</p>
        </template>
      </div>
    </div>
    <!-- Show message if user data is null -->
    <div v-else>
      <p>User not found or data is unavailable.</p>
    </div>
  </div>
</template>

  
  <script>
  import { defineComponent, ref, onMounted } from 'vue';
  import ReviewCard from './ReviewCard';
  import {useRoute} from 'vue-router';
  
  export default defineComponent({
    name: 'UserProfile',
    components: {
      ReviewCard,
    },
    setup() {
      const user = ref(null);
      const route = useRoute();
      const reviews = ref([]);
      const loading = ref(true);
      const error = ref(null);
      const user_Id = route.params.user_Id;
    
  
      const fetchUserData = async () => {
        console.log('Front-end user_Id: ', user_Id);
        try {
          const response = await fetch(`${process.env.VUE_APP_API_URL}/api/user/${user_Id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }  
          user.value =  await response.json();
          console.log(user);
        } catch (err) {
          error.value = 'Failed to fetch user data.';
          console.error('Error fetching user data:', err);
        }
      };
  
      const fetchUserReviews = async () => {
        try {
          const response = await fetch(`${process.env.VUE_APP_API_URL}/api/user/${user_Id}/reviews`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          console.log('User reviews: ', data);
          reviews.value = data;
        } catch (err) {
          error.value = 'Failed to fetch user reviews.';
          console.error('Error fetching user reviews:', err);
        } finally {
          loading.value = false;
        }
      };
  
      onMounted(() => {
        fetchUserData();
        fetchUserReviews();
      });
      return {
        user,
        reviews,
        loading,
        error,
      };
    },
  });
  </script>
  <style scoped>
.profile {
    background: #f4e3c1; /* Parchment-like background color */
    border-radius: 12px; /* Slightly more rounded corners */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Deeper shadow for a more pronounced effect */
    padding: 30px;
    max-width: 700px;
    margin: auto;
    text-align: center;
    font-family: 'Cinzel', serif; /* Medieval-inspired font */
    color: #4a3c2e; /* Dark brown text color */
  }
  
  .profile h1 {
    color: #3e2a1e; /* Dark brown color for the title */
    font-size: 3rem; /* Larger font size for emphasis */
    margin-bottom: 25px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3); /* Light shadow for a more dramatic effect */
  }
  
  .profile p {
    font-size: 1.25rem;
    color: #3e2a1e; /* Dark brown color for text */
    margin: 15px 0;
  }
  
  .profile .stats {
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    font-weight: bold;
  }
  
  .profile .stat {
    background: #d4af37; /* Gold color background */
    border-radius: 10px;
    padding: 15px;
    flex: 1;
    margin: 0 15px;
    border: 2px solid #bfa71a; /* Gold border for added definition */
  }
  
  .profile .stat p {
    font-size: 1.2rem;
    margin: 5px 0;
    color: #4a3c2e; /* Dark brown text color */
  }
  
  .profile .level {
    font-size: 1.75rem;
    font-weight: bold;
    color: #3e2a1e; /* Dark brown color for the level */
  }
  
  .reviews {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Responsive columns */
    gap: 20px; /* Space between cards */
    margin: 0 auto;
    padding: 20px;
  }
    </style>
  