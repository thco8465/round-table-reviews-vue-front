<template>
  <div class="reviewCard">
    <div class="reviewCard__cover">
      <img :src="imageUrl" :alt="review.game_name" />
    </div>

    <h3 class="gameTitle">{{ review.game_name }}</h3>
    <div class="rating">
      <p><strong>Rating:</strong></p>
      <!-- Medieval rating symbols computed property displayed on their own line -->
      <p class="rating-symbols">{{ medievalRatingIcons }}</p>
      <!-- Optionally display the numeric rating -->
      <p class="numerical-rating"><small>({{ review.rating }}/10)</small></p>
    </div>
    <p class="reviewText"><strong>Review:</strong> {{ review.review }}</p>
    <p class="timeSpent"><strong>Playtime:</strong> {{ review.time_spent }} hr</p>
    <p v-if="review.username" class="username">
      <strong>Username:</strong> {{ review.username }}
    </p>
    <p class="date"><strong>Date:</strong> {{ formattedDate }}</p>
    <!-- Voting Section -->
    <div class="voting-section">
      <button @click="vote(1)" :disabled="votingLoading">
        👍 ({{ helpfulVotes }})
      </button>
      <button @click="vote(-1)" :disabled="votingLoading">
        👎 ({{ notHelpfulVotes }})
      </button>
    </div>
    <div class="details">
      <router-link :to="`/Review_info_card/${review.id}`">details</router-link>
    </div>
    <!-- Comments Link -->
    <div class="comments-link">
      <router-link :to="{
        name: 'review-comments',
        params: { reviewId: review.id },
        query: { gameName: review.game_name, reviewUsername: review.username, userId: currentUserId }
      }">
        View Comments
      </router-link>
    </div>
  </div>
</template>


<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'ReviewCard',
  props: {
    review: {
      type: Object,
      required: true,
    },
    // Current user ID must be passed so the vote can be recorded with a user reference.
    currentUserId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    // Base URL from env
    const baseUrl = process.env.VUE_APP_API_URL;

    // Compute image URL and formatted date.
    const imageUrl = computed(() => props.review.cover);
    const formattedDate = computed(() => new Date(props.review.date).toLocaleDateString());

    // Local reactive state to store vote counts.
    const helpfulVotes = ref(props.review.helpful_votes || 0);
    const notHelpfulVotes = ref(props.review.not_helpful_votes || 0);
    const votingLoading = ref(false);

    const medievalRatingIcons = computed(() => {
      // Ensure the rating is an integer (round if necessary)
      const rating = Math.round(props.review.rating);
      // You might consider a max rating of 10, but here we just repeat the symbol.
      return '⚔️'.repeat(rating);
    });


    // Fetch the current likes/dislikes for this review.
    const fetchVotes = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/review/review/vote/${props.review.id}`);
        if (res.data) {
          helpfulVotes.value = res.data.helpfulVotes;
          notHelpfulVotes.value = res.data.notHelpfulVotes;
        }
      } catch (error) {
        console.error('Error fetching vote counts:', error);
      }
    };

    // Load votes when the component is mounted.
    onMounted(() => {
      fetchVotes();
    });

    // Post a vote (1 for helpful, -1 for not helpful).
    const vote = async (voteValue) => {
      votingLoading.value = true;
      try {
        await axios.post(`${baseUrl}/api/review/review/vote`, {
          reviewId: props.review.id,
          userId: props.currentUserId,
          vote: voteValue,
        });
        // After voting, refresh the vote counts.
        await fetchVotes();
      } catch (error) {
        console.error('Error casting vote:', error);
      } finally {
        votingLoading.value = false;
      }
    };

    return {
      imageUrl,
      formattedDate,
      helpfulVotes,
      notHelpfulVotes,
      votingLoading,
      vote,
      medievalRatingIcons,
    };
  },
});
</script>

<style scoped>
.reviewCard {
  background-color: #f4e3c1;
  /* Parchment-like background */
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.3s ease-in-out;
  border: 2px solid #d4af37;
  /* Gold border for a medieval feel */
  font-family: 'Cinzel', serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

.reviewCard__cover {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 150px;
}

.reviewCard__cover img {
  border-radius: 5px;
  max-width: 100%;
  height: 100%;
}

.gameTitle {
  font-size: 1.2rem;
  color: #3e2a1e;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.rating {
  font-size: 1rem;
  color: #d4af37;
}

.reviewText {
  margin: 10px 0;
  font-size: 1.1rem;
  color: #4a3c2e;
}

.details {
  margin-top: 15px;
}

.details a {
  text-decoration: none;
  color: #B08D57;
  font-weight: bold;
  transition: color 0.3s ease;
}

.details a:hover {
  color: #daa520;
}

.username,
.date {
  font-size: 0.9rem;
  color: #6a4c3a;
  text-align: right;
}

.date {
  margin-top: 10px;
}

.voting-section {
  margin-top: 15px;

}

.voting-section button {
  margin-top: 10px;
  margin-right: 10px;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #B08D57;
  color: #fff;
  transition: background-color 0.3s ease;
}

.voting-section button:hover {
  background-color: #daa520;
}

.comments-link {
  margin-top: 15px;
}

.comments-link a {
  text-decoration: none;
  color: #B08D57;
  font-weight: bold;
  transition: color 0.3s ease;
}

.comments-link a:hover {
  color: #daa520;
}
</style>
