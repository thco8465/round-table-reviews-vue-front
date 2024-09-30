<template>
  <div>
    <section>
      <div class="reviews">
        <p v-if="loading">Loading...</p>
        <template v-else>
          <ReviewCard
            v-for="review in reviews"
            :key="review.id"
            :review="review"
          />
          <p v-if="reviews.length === 0">No recent reviews</p>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ReviewCard from './ReviewCard.vue';

export default {
  name: 'MyHome',
  components: {
    ReviewCard,
  },
  setup() {
    const reviews = ref([]);
    const loading = ref(true);

    // Fetch recent reviews
    const fetchRecentReviews = async () => {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/review/recentReviews`, {
          headers: {
            'Content-Type': 'application/json',
            'bypass-tunnel-reminder': 'true',
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
        }

        const data = await response.json();
        console.log('Fetched reviews:', data); // Log the data
        reviews.value = data;
      } catch (error) {
        console.error('Error fetching recent reviews: ', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchRecentReviews();
    });

    return {
      reviews,
      loading,
    };
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  font-weight: bold;
  font-size: 30px;
  font-family: 'Courier New', Courier, monospace;
  color: aqua;
}
.game-card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 10px;
  padding: 10px;
  justify-content: center;
  width: 100%; /* Ensure container takes full width */
  margin: 0 auto; /* Center container horizontally */
}
.game-card-container > * {
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  justify-content: center;
}
.reviews {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Responsive columns */
  gap: 20px; /* Space between cards */
  margin: 0 auto;
  padding: 20px;
}
</style>
