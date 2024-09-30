<template>
  <div class="profile">
    <h1 v-if="user">{{ user.username }}'s Profile</h1>
    <div v-else>
      <p>Loading user data...</p>
    </div>

    <div class="stats" v-if="user">
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
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/user/me`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // Handle the case where the response is not OK
          console.error(`Error: ${response.statusText}`);
          return; // Exit if the response is not OK
        }

        const data = await response.json();
        user.value = data; // Assign fetched data to user
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };


    const fetchUserReviews = async () => {
      const token = localStorage.getItem('token');
      const url = `${process.env.VUE_APP_API_URL}/api/user/displayReviews`;

      console.log('Fetching user reviews from URL:', url); // Log the URL being fetched
      console.log('Using token:', token); // Log the token being used

      try {
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'bypass-tunnel-reminder': 'true',
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('Response status:', response.status); // Log the response status

        if (!response.ok) {
          const errorMessage = await response.text(); // Capture the error message from the response
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
        }

        const data = await response.json();
        console.log('Fetched reviews data:', data); // Log the fetched data
        reviews.value = data; // Assign fetched data to reviews
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
