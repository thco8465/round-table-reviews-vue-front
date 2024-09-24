<template>
    <div :class="styles.container">
      <h2>Search for reviews by username</h2>
      <input
        type="text"
        v-model="username"
        placeholder="Enter username"
        :class="styles.input"
      />
      <button @click="handleSearch" :class="styles.button">Search</button>
      <div :class="styles.results">
        <div v-for="review in reviews" :key="review.id" :class="styles.review">
          <ReviewCard :review="review" />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import ReviewCard from './ReviewCard.vue'; // Adjust the path as necessary
  
  interface Review {
    id: number;
    game_name: string;
    review: string;
    time_spent: number;
    rating: number;
    username: string;
    date: string;
    cover: string;
  }
  
  export default defineComponent({
    name: 'UserSearch',
    components: {
      ReviewCard,
    },
    setup() {
      const username = ref('');
      const reviews = ref<Review[]>([]);
  
      const handleSearch = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/review/reviews/user/${encodeURIComponent(username.value)}`
          );
          const data: Review[] = await response.json(); // Specify type here
          reviews.value = data;
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      };
  
      return {
        username,
        reviews,
        handleSearch,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Use your CSS module styles here. Adjust if needed. */
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    background-size: cover;
    background-color: #f4e3c1; /* Parchment-like background */
    border: 5px solid #B08D57;
    
}

.input {
    width: 90%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
}

.button {
    width: 100%;
    padding: 10px;
    background-color: #B08D57;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6); /* Shadow for a dramatic effect */
}

.button:hover {
    background-color: #DAA520;
}

.results {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Creates a grid with 3 columns */
    gap: 20px; /* Adds space between the grid items */
    padding: 20px;
}

.noResults {
    text-align: center;
    color: #999;
    margin-top: 20px;
    font-size: 16px;
}

  </style>
  