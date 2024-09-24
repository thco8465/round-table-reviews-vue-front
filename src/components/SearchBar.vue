<template>
  <div :class="container">
    <div :class="searchBox">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for game and select"
        :class="input"
      />
      <button @click="handleSearch" :class="button">Search</button>
    </div>

    <p v-if="error" :class="errorClass">{{ error }}</p>

    <div v-if="gameData" :class="gameInfo">
      <h2>{{ gameData.title }}</h2>
      <img :src="gameData.cover" :alt="gameData.title" :class="coverImage" />
      <button @click="handleGameSelect" :class="selectButton">Select Game</button>
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
          `${process.env.VUE_API_URL}/api/twitch_api/games?name=${encodeURIComponent(searchQuery.value)}`,
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
/* Your styles here */
</style>
