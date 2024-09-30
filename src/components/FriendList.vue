<template>
  <div class="container">
    <h1 class="header">Friend Status</h1>
    <p v-if="loading" class="loading">Loading...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div class="friendSection">
      <h2 class="subheader">Friends</h2>
      <ul class="friendList">
        <li
          v-for="friend in acceptedFriends"
          :key="friend.friend_id"
          class="friendItem"
        >
          <span>{{ friend.friend_username }}</span>
          <div class="btnContainer">
            <router-link
              :to="`/userProfile/${friend.friend_id}`"
              class="btnProfile"
            >
              Profile
            </router-link>
            <button class="Unfriend" @click="handleUnfriend(friend.friend_id)">
              Unfriend
            </button>
          </div>
        </li>
      </ul>
    </div>

    <div class="friendSection">
      <h2 class="subheader">Pending Requests</h2>
      <ul class="friendList">
        <li
          v-for="friend in sentRequests"
          :key="friend.friend_id"
          class="friendItem"
        >
          <span>{{ friend.friend_username }}</span>
          <span class="status">{{ friend.status }}</span>
        </li>
      </ul>
    </div>

    <div class="friendSection">
      <h2 class="subheader">Received Requests</h2>
      <ul class="friendList">
        <li
          v-for="friend in receivedRequests"
          :key="friend.friend_id"
          class="friendItem"
        >
          <span>{{ friend.friend_username }}</span>
          <span class="status">{{ friend.status }}</span>
          <div v-if="friend.status === 'pending'" class="actions">
            <button
              class="acceptBtn"
              @click="handleAcceptRequest(friend.friend_id)"
            >
              Accept
            </button>
            <button
              class="declineBtn"
              @click="handleDeclineRequest(friend.friend_id)"
            >
              Decline
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

const fetchUserData = async () => {
  try {
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
    return { id: data.id }; // Adjust based on your API response
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export default {
  setup() {
    const userId = ref(null);
    const acceptedFriends = ref([]);
    const sentRequests = ref([]);
    const receivedRequests = ref([]);
    const error = ref(null);
    const loading = ref(true);

    onMounted(async () => {
      const userData = await fetchUserData();
      if (userData) {
        userId.value = userData.id;
        await fetchFriends();
        await fetchSentRequests();
        await fetchReceivedRequests();
      }
    });

    const fetchFriends = async () => {
      if (!userId.value) return;
      loading.value = true;
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/user/friends?id=${userId.value}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        acceptedFriends.value = data;
      } catch (error) {
        error.value = 'Failed to fetch friends. Please try again.';
        console.error('Error fetching friends:', error);
      } finally {
        loading.value = false;
      }
    };

    const fetchSentRequests = async () => {
      if (!userId.value) return;
      loading.value = true;
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/user/friends/sent?id=${userId.value}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        sentRequests.value = data;
      } catch (error) {
        error.value = 'Failed to fetch sent friend requests. Please try again.';
        console.error('Error fetching sent requests:', error);
      } finally {
        loading.value = false;
      }
    };

    const fetchReceivedRequests = async () => {
      if (!userId.value) return;
      loading.value = true;
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/user/friends/received?id=${userId.value}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        receivedRequests.value = data;
      } catch (error) {
        error.value = 'Failed to fetch received friend requests. Please try again.';
        console.error('Error fetching received requests:', error);
      } finally {
        loading.value = false;
      }
    };

    const handleAcceptRequest = async (friendId) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/user/friends/accept`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: userId.value, friendId }),
        });

        if (!response.ok) {
          throw new Error(`Failed to accept request. Status: ${response.status}`);
        }

        // Update UI after accepting
        receivedRequests.value = receivedRequests.value.map(friend =>
          friend.friend_id === friendId ? { ...friend, status: 'accepted' } : friend
        );
      } catch (error) {
        console.error('Error accepting friend request:', error);
      }
    };

    const handleDeclineRequest = async (friendId) => {
      loading.value = true;
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/user/friends/decline`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: userId.value, friendId }),
        });

        if (!response.ok) {
          throw new Error(`Failed to decline request. Status: ${response.status}`);
        }

        // Update UI after declining
        receivedRequests.value = receivedRequests.value.map(friend =>
          friend.friend_id === friendId ? { ...friend, status: 'declined' } : friend
        );
      } catch (error) {
        console.error('Error declining friend request:', error);
      } finally {
        loading.value = false;
      }
    };

    const handleUnfriend = async (friend_id) => {
      loading.value = true; // Optional: Set loading state to true while the request is in progress
      try {
        // Make a DELETE request to your backend API to remove the friend
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/user/friends/unfriend/${friend_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Optional: Include token if needed
          },
        });

        // Check if the response is okay (status code 2xx)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Optionally update local state or UI to reflect the change
        acceptedFriends.value = acceptedFriends.value.filter(friend => friend.friend_id !== friend_id);

        // Optionally show a success message or notification
        console.log('Successfully unfriended');
      } catch (error) {
        // Handle errors (e.g., show error message)
        console.error('Error unfriending:', error);
      } finally {
        loading.value = false; // Optional: Set loading state to false once the request completes
      }
    };

    return {
      acceptedFriends,
      sentRequests,
      receivedRequests,
      error,
      loading,
      handleAcceptRequest,
      handleDeclineRequest,
      handleUnfriend,
    };
  },
};
</script>
  
  <style scoped>
/* friendList.module.css */

.container {
    background: #f5f3e8; /* Light parchment or old paper color */
    border: 2px solid #4a3c2b; /* Dark brown border */
    border-radius: 12px; /* Rounded corners */
    padding: 20px;
    max-width: 800px;
    margin: 20px auto;
    font-family: 'Garamond', serif; /* Medieval-style font */
    color: #3b2a1a; /* Dark text color for contrast */
  }
  
  .header {
    color: #3b2a1a; /* Dark brown for the header */
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 20px;
    border-bottom: 2px solid #4a3c2b; /* Border under the title */
    padding-bottom: 10px;
  }
  
  .loading {
    text-align: center;
    font-size: 1.2rem;
    color: #6a4b29; /* Darker brown for loading text */
  }
  
  .error {
    color: #d9534f; /* Red for error messages */
    font-size: 1rem;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .friendSection {
    margin: 40px;
  }
  
  .subheader {
    color: #3b2a1a; /* Dark brown for section headers */
    font-size: 2rem;
    border-bottom: 1px solid #4a3c2b; /* Border under the subheader */
    padding-bottom: 10px;
    margin-bottom: 15px;
  }
  
  .friendList {
    list-style-type: none;
    margin: 20px;
  }
  
  .friendItem {
    background: #e1d7c6; /* Light background for friend items */
    border: 1px solid #4a3c2b; /* Dark brown border */
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between; /* Align content to edges */
    align-items: center;
    font-size: 1rem;
  }
  .friend-username {
  font-size: 1.2em; /* Increase font size for the username */
  font-weight: bold; /* Make it bold for emphasis */
}

.status {
  font-size: 1.1em; /* Slightly larger than default */
  font-weight: bold;
  margin-left: 20px; /* Add some spacing between the username and status */
}
  .pending {
    background: #f7d8b3; /* Light orange for pending status */
  }
  
  .accepted {
    background: #d4edda; /* Light green for accepted status */
  }
  
  .declined {
    background: #f8d7da; /* Light red for declined status */
  }
  
  .actions {
    display: flex;
    gap: 10px;
  }
  
  .acceptBtn,
  .declineBtn {
    background: #4a3c2b; /* Dark brown background */
    color: #f5f3e8; /* Light text color */
    border: none;
    border-radius: 6px;
    padding: 8px 16px;
    cursor: pointer;
    font-family: 'Garamond', serif;
    font-weight: bold;
    transition: background 0.3s ease;
  }
  
  .acceptBtn:hover {
    background: #6a4b29; /* Slightly lighter brown on hover */
  }
  
  .declineBtn:hover {
    background: #6a4b29; /* Slightly lighter brown on hover */
  }
  
  .acceptBtn:focus,
  .declineBtn:focus {
    outline: 2px solid #3b2a1a; /* Darker border on focus */
  }
  .btnContainer {
    display: flex;
    gap: 10px; /* Space between buttons */
  }
  .btnProfile {
    background-color: forestgreen;
    color: white;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: transform 0.3s ease, background-color 0.3s ease; /* Smooth transition */
  }
  
  .Unfriend {
    background-color: #800020;
    color: white;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: transform 0.3s ease, background-color 0.3s ease; /* Smooth transition */
  }
  .btnProfile:hover {
    transform: scale(1.1); /* Increase size on hover */
    background-color: #228b22; /* Darker green on hover */
  }
  .Unfriend:hover {
    transform: scale(1.1); /* Increase size on hover */
    background-color: #a60024; /* Darker burgundy on hover */
  }  </style>
  