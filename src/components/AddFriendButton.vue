<template>
  <div>
    <h3>{{ selectedUser.username }}</h3>
    <button @click="sendFriendRequest">Add Friend</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'; // Import ref and onMounted for reactivity and lifecycle

const fetchUserData = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.VUE_APP_API_URL}/api/user/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const { id, username } = data; // Destructure the user data
    return { id, username };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export default {
  name: 'FriendButton',
  props: {
    selectedUser: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const userId = ref(null); // Change id to userId for clarity

    const loadUserData = async () => {
      const userData = await fetchUserData();
      if (userData) {
        userId.value = userData.id; // Assign userId here
      }
    };

    const sendFriendRequest = async () => {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/user/add-friend`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId.value, // Use userId instead of id
            friendId: props.selectedUser.id,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Server response:', result);

        alert('Friend request sent!');
      } catch (error) {
        console.error('Error sending friend request:', error);
        alert('Failed to send friend request. Please try again.');
      }
    };

    // Load user data on component mount
    onMounted(loadUserData);

    return {
      sendFriendRequest,
      userId, // Return userId to use in the template if needed
    };
  },
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
