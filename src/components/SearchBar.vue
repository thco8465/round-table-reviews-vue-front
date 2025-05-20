<template>
  <!-- Bind a "selected" class when selectedGame is truthy -->
  <div :class="['container', { selected: selectedGame }]">
    <!-- Only show search input and results if no game has been selected -->
    <div v-if="!selectedGame">
      <div class="search-box">
        <input type="text" v-model="searchQuery" placeholder="Search for a game" class="input" />
        <button @click="handleSearch" class="button">Search</button>
      </div>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-else-if="gameData && !gameData.length" class="no-results">
        No matching games found.
      </p>

      <div v-if="gameData.length" class="results-grid">
        <div v-for="game in gameData" :key="game.id" class="game-card">
          <img :src="game.cover" :alt="game.title" class="cover-image" />
          <h3 class="game-title">{{ game.title }}</h3>
          <button @click="handleGameSelect(game)" class="select-button">
            Review Game
          </button>
        </div>
      </div>
    </div>

    <!-- Once a game is selected, only show that game -->
    <div v-else class="selected-game">
      <div class="game-card">
        <img :src="selectedGame.cover" :alt="selectedGame.title" class="cover-image" />
        <h3 class="game-title">{{ selectedGame.title }}</h3>
        <!-- Optional: allow the user to change the selected game -->
        <button @click="resetSelection" class="select-button">
          Change Game
        </button>
      </div>
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
    const gameData = ref([]);
    const error = ref('');
    const selectedGame = ref(null);

    const handleSearch = async () => {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_API_URL}/api/twitch_api/games?name=${encodeURIComponent(
            searchQuery.value
          )}`,
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
        console.log('data returned from twitch api: ', data);
        gameData.value = data;
        error.value = '';
      } catch (err) {
        error.value = err.message || 'Unknown error';
        gameData.value = [];
      }
    };

    const handleGameSelect = (game) => {
      selectedGame.value = game; // update the selected game state
      // notify the parent component with the selected game
      props.onGameSelect(game);
    };

    // Optional: allow the user to reset the game selection
    const resetSelection = () => {
      selectedGame.value = null;
      gameData.value = [];
      searchQuery.value = '';
    };

    return {
      searchQuery,
      gameData,
      error,
      selectedGame,
      handleSearch,
      handleGameSelect,
      resetSelection,
    };
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Uncial+Antiqua&display=swap');

.container {
  max-width: 1200px;
  /* put this back to limit width */
  width: 100%;
  /* full width up to max-width */
  margin: 40px auto;
  padding: 30px;
  background-color: #f4e3c1;
  border: 5px solid #B08D57;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  font-family: 'Cinzel', serif;
  /* Remove text-align center here to avoid messing with grid */
  text-align: left;
  transition: width 0.5s ease;
}
.container.selected {
  width: 300px; /* New width when a game is selected */
}
.search-box {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
  text-align: center;
  /* keep search box centered */
}


.input {
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #B08D57;
  border-radius: 6px;
  max-width: 400px;
}

.button {
  padding: 12px 24px;
  background-color: #B08D57;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;
}

.button:hover {
  background-color: #DAA520;
}


.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.game-card {
  background-color: #fff8e7;
  border: 2px solid #B08D57;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  transition: transform 0.2s ease;
  box-sizing: border-box;
  /* Make cards full width of grid cell */
  width: 100%;
  max-width: 180px;
  /* optional max width for better scaling */
  margin: 0 auto;
  /* center cards */
}

.game-card:hover {
  transform: translateY(-4px);
}

.cover-image {
  width: 100%;
  height: 120px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 12px;
}

.game-title {
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: 700;
}

.select-button {
  padding: 8px 16px;
  background-color: #B08D57;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.select-button:hover {
  background-color: #DAA520;
}

.error {
  color: darkred;
  font-weight: bold;
  margin-top: 15px;
}

.no-results {
  margin-top: 20px;
  font-style: italic;
  color: #777;
}

.selected-game {
  text-align: center;
}
</style>
