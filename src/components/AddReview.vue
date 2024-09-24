<template>
  <div class="reviewCard">
    <h3 class="title">Add Your Review</h3>
    <form @submit.prevent="handleSubmit" class="reviewForm">
      <div class="formGroup">
        <label for="review">Your Review</label>
        <textarea
          id="review"
          rows="4"
          v-model="formData.review"
        ></textarea>
      </div>

      <div class="formGroup">
        <label for="high">High Point</label>
        <input
          id="high"
          type="text"
          v-model="inDepth.high"
        />
      </div>

      <div class="formGroup">
        <label for="low">Low Point</label>
        <input
          id="low"
          type="text"
          v-model="inDepth.low"
        />
      </div>

      <div class="formGroup">
        <label for="atmosphere">Atmosphere (1-10)</label>
        <input
          id="atmosphere"
          type="number"
          min="1"
          max="10"
          v-model.number="inDepth.atmosphere"
        />
      </div>

      <div class="formGroup">
        <label for="story">Story (1-10)</label>
        <input
          id="story"
          type="number"
          min="1"
          max="10"
          v-model.number="inDepth.story"
        />
      </div>

      <div class="formGroup">
        <label for="gameplay">Gameplay (1-10)</label>
        <input
          id="gameplay"
          type="number"
          min="1"
          max="10"
          v-model.number="inDepth.gameplay"
        />
      </div>

      <div class="formGroup">
        <label for="difficulty">Difficulty (1-10)</label>
        <input
          id="difficulty"
          type="number"
          min="1"
          max="10"
          v-model.number="inDepth.difficulty"
        />
      </div>

      <div class="formGroup">
        <label for="dev_note">Note to Developer</label>
        <input
          id="dev_note"
          type="text"
          v-model="inDepth.dev_note"
        />
      </div>

      <div class="formGroup">
        <label for="rating">Overall rating (1-10)</label>
        <input
          id="rating"
          type="number"
          min="1"
          max="10"
          v-model.number="formData.rating"
        />
      </div>

      <div class="formGroup">
        <label for="timeSpent">Time Spent (hours)</label>
        <input
          id="timeSpent"
          type="number"
          min="0"
          step="0.1"
          v-model.number="formData.timeSpent"
        />
      </div>

      <div class="formGroup">
        <label for="date">Date</label>
        <input
          id="date"
          type="date"
          v-model="formData.date"
        />
      </div>

      <button type="submit" class="submitButton">Submit Review</button>
    </form>
    <div v-if="loading" class="spinner">Loading...</div>
  </div>
</template>
  
  <script>
  import { ref, onMounted, watch } from 'vue'; // Import Vue's ref and lifecycle methods
  
  export default {
    name: 'ReviewForm',
    props: {
      selectedGame: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const formData = ref({
        gameId: props.selectedGame?.gameId || '',
        game_name: props.selectedGame?.title || '',
        review: '',
        timeSpent: '',
        rating: 1,
        date: new Date().toISOString().split('T')[0],
        userId: null,
      });
  
      const inDepth = ref({
        review_id: 0,
        high: '',
        low: '',
        atmosphere: 1,
        story: 1,
        dev_note: '',
        gameplay: 1,
        difficulty: 1,
      });
  
      const loading = ref(false);
  
      const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/me`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        return data.id;
      };
  
      const initializeFormData = async () => {
        try {
          const userId = await fetchUserData();
          if (userId) {
            formData.value.userId = userId;
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      onMounted(() => {
        initializeFormData();
      });
  
      watch(() => props.selectedGame, (newVal) => {
        if (newVal) {
          formData.value.gameId = newVal.gameId;
          formData.value.game_name = newVal.title;
        }
      });
  
      const handleSubmit = async () => {
        if (formData.value.rating < 1 || formData.value.rating > 10) {
          alert('Rating must be between 1 and 10');
          return;
        }
  
        try {
          loading.value = true; // Start loading
  
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/review/review`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData.value),
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const result = await response.json();
          const reviewId = result.id;
  
          inDepth.value.review_id = reviewId;
  
          const inDepthResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/review/review/in-depth`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...inDepth.value, review_id: reviewId }),
          });
  
          if (!inDepthResponse.ok) {
            throw new Error('Failed to submit in-depth review');
          }
  
          await fetch(`${import.meta.env.VITE_API_URL}/api/user/reviewCount`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
  
          // Add experience
          await fetch(`${import.meta.env.VITE_API_URL}/api/user/exp`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ exp: 10 }),
          });
  
          // Reset form
          formData.value = {
            gameId: null,
            game_name: '',
            review: '',
            timeSpent: '',
            rating: 1,
            date: new Date().toISOString().split('T')[0],
            userId: null,
          };
          inDepth.value = {
            review_id: 0,
            high: '',
            low: '',
            atmosphere: 1,
            story: 1,
            dev_note: '',
            gameplay: 1,
            difficulty: 1,
          };
        } catch (error) {
          console.error('Error submitting form:', error);
        } finally {
          loading.value = false; // End loading
        }
      };
  
      return {
        formData,
        inDepth,
        loading,
        handleSubmit,
      };
    },
  };
  </script>
  
  <style scoped>
 .reviewCard {
  background-size: cover;
  background-color: #f4e3c1; /* Parchment-like background */
  border: 5px solid #B08D57;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.2s ease-in-out;
  }
  .title{
    text-align: center;
  }
  .reviewForm {
    display: flex;
    flex-direction: column;
  }
  
  .formGroup {
    margin-bottom: 16px;
  }
  
  .formGroup label {
    display: block;
    margin-bottom: 8px;
  }
  
  .formGroup input,
  .formGroup textarea,
  .formGroup .ant-select {
    width: 100%;
  }
  
  .submitButton {
    align-self: center;
  }
  
  .spinner {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  </style>
  