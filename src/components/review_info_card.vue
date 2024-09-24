<template>
    <div class="reviewCard">
      <!-- Cover image of the game -->
      <div class="reviewCard__cover">
        <img :src="imageUrl" :alt="review.game_name" />
      </div>
  
      <h3 class="gameTitle">{{ review.game_name }}</h3>
      <p class="rating"><strong>High Point:</strong> {{ review.high }}</p>
      <p class="reviewText"><strong>Low Point:</strong> {{ review.low }}</p>
      <p class="reviewText"><strong>Atmosphere:</strong> {{ review.atmosphere }}/10</p>
      <p class="reviewText"><strong>Story:</strong> {{ review.story }}/10</p>
      <p class="reviewText"><strong>Gameplay:</strong> {{ review.gameplay }}/10</p>
      <p class="reviewText"><strong>Note to Developer:</strong> {{ review.dev_note }}</p>
  
      <p v-if="review.username" class="username"><strong>Username:</strong> {{ review.username }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  
  interface ReviewInfo {
    id: number;
    review_id: number;
    high: string;
    low: string;
    atmosphere: number;
    story: number;
    dev_note: string;
    gameplay: number;
    username?: string; // Optional username
    game_name: string;
    cover: string;
  }
  
  export default defineComponent({
    name: 'ReviewCard',
    props: {
      review: {
        type: Object as () => ReviewInfo,
        required: true,
      },
    },
    setup(props) {
      // Compute the image URL based on the review cover
      const imageUrl = computed(() =>
        props.review.cover.replace('{width}', '100').replace('{height}', '150')
      );
  
      return {
        imageUrl,
      };
    },
  });
  </script>
  
  <style scoped>
.reviewCard {
  background-color: #f4e3c1; /* Parchment-like background color */
  border-radius: 12px; /* Slightly more rounded corners */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Deeper shadow for added depth */
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.3s ease-in-out; /* Smoother scaling effect */
  border: 2px solid #d4af37; /* Gold border to enhance the medieval feel */
  font-family: 'Cinzel', serif; /* Medieval-inspired font */
  display: flex;
  flex-direction: column; /* Stack children vertically */
  align-items: center; /* Center children horizontally */
  text-align: center; /* Center text horizontally */
}

.reviewCard__cover {
  display: flex;
  justify-content: center; /* Center content horizontally */
  width: 100%; /* Full width to contain image */
}

.reviewCard__cover img {
  max-width: 100%; /* Ensure the image scales properly */
  height: auto; /* Maintain aspect ratio */
}

.reviewCardContent {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center all content except for the date and username */
}

.reviewCardContent > *:not(.username, .date) {
  margin-bottom: 10px; /* Margin between items */
}

.reviewCard:hover {
  transform: scale(1.03); /* Slightly larger scale for emphasis */
}

.gameTitle {
  font-size: 1.2rem; /* Larger font size for emphasis */
  color: #3e2a1e; /* Dark brown color for the title */
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); /* Light shadow for a dramatic effect */
}

.rating {
  font-size: 1rem; /* Slightly larger font size for better readability */
  color: #d4af37; /* Gold color for ratings */
}

.reviewText {
  margin: 10px 0;
  font-size: 1.1rem; /* Slightly larger font size for better readability */
  color: #4a3c2e; /* Dark brown color for text */
}

.username, .date {
  font-size: 0.9rem;
  color: #6a4c3a; /* Slightly lighter brown color for dates */
  text-align: right; /* Align text to the right */
}

.date {
  margin-top: 10px; /* Margin for better spacing */
}

  </style>
  