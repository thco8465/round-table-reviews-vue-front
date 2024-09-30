<template>
  <div class="container">
    <input
      type="text"
      v-model="query"
      placeholder="Search for a username"
      class="input"
    />
    <button @click="searchUsers" class="button">Search</button>
    <ul class="resultsList">
      <li v-for="user in results" :key="user.id" class="user">
        <span class="username">{{ user.username }}</span>
        <button class="selectButton" @click="selectUser(user)">Select User</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'FriendSearch',
  props: {
    onUserSelect: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const query = ref(''); // Reactive query string
    const results = ref([]); // Reactive results array

    const searchUsers = async () => {
      try {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/api/user/search-user?username=${query.value}`);
        const data = await res.json();
        results.value = data; // Update results with fetched data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const selectUser = (user) => {
      props.onUserSelect(user); // Call the parent callback with selected user
    };

    return {
      query,
      results,
      searchUsers,
      selectUser,
    };
  },
};
</script>
  <style scoped>
  
.container {
    padding: 20px;
}

.input {
    margin-right: 10px;
    padding: 8px;
    font-size: 16px;
}

.button {
    padding: 8px 12px;
    font-size: 16px;
    cursor: pointer;
}

.resultsList {
    list-style-type: none;
    padding: 0;
    margin: 20px 0 0;
}

.user {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.username {
    font-weight: bold;
}

.selectButton {
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
}

  </style>
  