<template>
  <div class="container">
    <div class="searchBox">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for game and select"
        class="input"
      />
      <button @click="handleSearch" class="button">Search</button>
    </div>

    <p v-if="error" class="errorClass">{{ error }}</p>

    <div v-if="gameData" class="gameInfo">
      <h2>{{ gameData.title }}</h2>
      <img :src="gameData.cover" :alt="gameData.title" class="coverImage" />
      <button @click="handleGameSelect" class="selectButton">Select Game</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SearchBar',
  props: {
    onGameSelect: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const searchQuery = ref('');
    const gameData = ref(null);
    const error = ref('');

    const handleSearch = async () => {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_API_URL}/api/twitch_api/games?name=${encodeURIComponent(searchQuery.value)}`,
          {
            headers: {
              'bypass-tunnel-reminder': 'true',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Game not found or API error');
        }

        const data = await response.json();
        gameData.value = data;
        error.value = '';
      } catch (err) {
        error.value = err.message || 'Unknown error';
        gameData.value = null;
      }
    };

    const handleGameSelect = () => {
      if (gameData.value) {
        props.onGameSelect(gameData.value);
      }
    };

    return {
      searchQuery,
      gameData,
      error,
      handleSearch,
      handleGameSelect,
      container: 'container',
      searchBox: 'searchBox',
      input: 'input',
      button: 'button',
      errorClass: 'error',
      gameInfo: 'gameInfo',
      coverImage: 'coverImage',
      selectButton: 'selectButton',
    };
  },
};
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
