<template>
  <div>
    <div class="title">Recent Reviews</div>
    <section>
      <div class="reviews">
        <p v-if="loading">Loading...</p>
        <template v-else>
          <ReviewCard v-for="review in reviews" :key="review.id" :review="review" :currentUserId="userId"/>
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
    const userId = ref(null);
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.VUE_APP_API_URL}/api/user/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      userId.value = data.id;
      return data.id;
    };

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
      fetchUserData();
      fetchRecentReviews();
    });

    return {
      reviews,
      loading,
      userId
    };
  },
};
</script>

<style scoped>
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
  margin: 20px auto 30px; /* top margin and extra bottom margin to separate from content */
  background: linear-gradient(135deg, #f9f3e4, #f4e3c1); /* subtle gradient inspired by your header/card tones */
  border-bottom: 3px solid #B08D57; /* a strong accent line that echoes your border color */
  font-weight: 700;
  font-size: 2rem;
  font-family: 'Cinzel', serif;
  color: #4a3523; /* a dark, complementary tone */
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px 5px 0 0; /* slightly round the top corners for a modern look */
}

.game-card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 10px;
  padding: 10px;
  justify-content: center;
  width: 100%;
  /* Ensure container takes full width */
  margin: 0 auto;
  /* Center container horizontally */
}

.game-card-container>* {
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  justify-content: center;
}

.reviews {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  /* Responsive columns */
  gap: 20px;
  /* Space between cards */
  margin: 0 auto;
  padding: 20px;
}
</style>
