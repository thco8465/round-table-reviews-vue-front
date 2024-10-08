<template>
  <div class="reviewCard" v-if="reviewInfo">
    <div class="reviewCard__cover">
      <img :src="imageUrl" :alt="reviewInfo[10]" />
    </div>
    <h3 class="gameTitle">{{ reviewInfo[10] }}</h3>
    <p class="reviewText"><strong>High Point:</strong> {{ reviewInfo[2] }}</p>
    <p class="reviewText"><strong>Low Point:</strong> {{ reviewInfo[3] }}</p>
    <p class="reviewText"><strong>Atmosphere:</strong> {{ reviewInfo[4] }}/10</p>
    <p class="reviewText"><strong>Story:</strong> {{ reviewInfo[4] }}/10</p>
    <p class="reviewText"><strong>Gameplay:</strong> {{ reviewInfo[5] }}/10</p>
    <p class="reviewText"><strong>Developer Note:</strong> {{ reviewInfo[6] }}</p>
    <p class="reviewText"><strong>Difficulty:</strong> {{ reviewInfo[7] }}/10</p>
  </div>
  <div v-else>
    <p>Loading review details...</p>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ReviewInfoCard',
  setup() {
    const reviewInfo = ref(null);
    const route = useRoute();

    // Use computed to define imageUrl based on reviewInfo
    const imageUrl = computed(() => {
      if (reviewInfo.value) {
        return reviewInfo.value[9].replace('{width}', '100').replace('{height}', '150');
      }
      return ''; // Return an empty string while loading
    });

    const fetchReviewInfo = async () => {
      const reviewId = route.params.review_id; // Get the review ID from the route
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/review/review/in-depth/${reviewId}`); // Adjust URL to your API endpoint

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        reviewInfo.value = await response.json(); // Store fetched review info
        console.log('Fetched reviewInfo: ', reviewInfo.value);
      } catch (error) {
        console.error('Error fetching review info:', error);
      }
    };

    onMounted(() => {
      fetchReviewInfo(); // Fetch review info when the component is mounted
    });

    return {
      reviewInfo,
      imageUrl
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
  