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

<script>
import { ref, onMounted } from 'vue';
import ReviewCard from './ReviewCard';

export default {
  name: 'MyProfile',
  components: {
    ReviewCard,
  },
  setup() {
    const user = ref(null);
    const reviews = ref([]);

    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${process.env.VUE_API_URL}/api/user/me`, {
          headers: {
            'Content-Type': 'application/json',
            'bypass-tunnel-reminder': 'true',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        user.value = data;
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    const fetchUserReviews = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${process.env.VUE_API_URL}/api/user/displayReviews`, {
          headers: {
            'Content-Type': 'application/json',
            'bypass-tunnel-reminder': 'true',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        reviews.value = data;
      } catch (error) {
        console.error('Error fetching user reviews: ', error);
      }
    };

    onMounted(() => {
      fetchUserData();
      fetchUserReviews();
    });

    return {
      user,
      reviews,
    };
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
