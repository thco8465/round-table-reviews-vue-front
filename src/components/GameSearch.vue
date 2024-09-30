<template>
  <div class="container">
    <h2>Search for reviews by game</h2>
    <input
      type="text"
      v-model="gameName"
      placeholder="Enter game name"
      class="input"
    />
    <button @click="handleSearch" class="button">Search</button>
    <div class="results">
      <div v-for="review in reviews" :key="review.id" class="review">
        <ReviewCard :review="review" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReviewCard from './ReviewCard.vue'; // Adjust the path as necessary

export default defineComponent({
  name: 'GameSearch',
  components: {
    ReviewCard,
  },
  setup() {
    const gameName = ref('');
    const reviews = ref([]);

    const handleSearch = async () => {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_API_URL}/api/review/reviews/game/${encodeURIComponent(gameName.value)}`
        );
        const data = await response.json();
        reviews.value = data;
        console.log(reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    return {
      gameName,
      reviews,
      handleSearch,
    };
  },
});
</script>
  
  <style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Uncial+Antiqua&display=swap');

body {
  font-family: 'Cinzel', serif;
}
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
  