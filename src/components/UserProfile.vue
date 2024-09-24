<template>
    <div class="profile">
      <h1>{{ user.username }}'s Profile</h1>
      <div class="stats">
        <div class="stat">
          <p>Review Count:</p>
          <p>{{ user.reviewCount }}</p>
        </div>
        <div class="stat">
          <p>Experience:</p>
          <p>{{ user.exp }}</p>
        </div>
        <div class="stat">
          <p class="level">Level:</p>
          <p>{{ user.level }}</p>
        </div>
      </div>
      <div class="reviews">
        <template v-if="reviews.length > 0">
          <ReviewCard v-for="review in reviews" :key="review.id" :review="review" />
        </template>
        <template v-else>
          <p>No reviews yet!</p>
        </template>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, watch } from 'vue';
  import ReviewCard from '../reviewCard/reviewCard';
  import styles from './userProfile.module.css';
  
  interface Review {
    id: number;
    rating: number;
    review: string;
    date: string;
    game_name: string;
    cover: string;
  }
  
  interface User {
    username: string;
    reviewCount: number;
    exp: number;
    level: string;
  }
  
  export default defineComponent({
    name: 'UserProfile',
    components: {
      ReviewCard,
    },
    props: {
      userId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const user = ref<User | null>(null);
      const reviews = ref<Review[]>([]);
      const loading = ref<boolean>(true);
      const error = ref<string | null>(null);
  
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/${props.userId}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          user.value = data;
        } catch (err) {
          error.value = 'Failed to fetch user data.';
          console.error('Error fetching user data:', err);
        }
      };
  
      const fetchUserReviews = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/${props.userId}/reviews`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
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
  
      watch(() => props.userId, (newUserId) => {
        loading.value = true; // Reset loading state
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
  