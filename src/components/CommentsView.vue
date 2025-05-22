<template>
  <div class="comments-container">
    <!-- New Comment Form -->
    <div class="new-comment">
      <h2>Add a Comment</h2>
      <textarea 
        v-model="newComment" 
        placeholder="Write your comment..."
        rows="3"
      ></textarea>
      <button @click="submitComment" :disabled="posting">
        {{ posting ? "Posting..." : "Post Comment" }}
      </button>
    </div>

    <!-- Existing Comments List -->
    <div class="existing-comments">
      <h1>Comments for {{ gameName }} review by {{ reviewUsername }}</h1>
      <div v-if="loading">Loading comments...</div>
      <ul v-else>
        <li v-for="comment in comments" :key="comment.id">
          <strong>{{ comment.username }}</strong>: {{ comment.comment }}
          <em>({{ formatDate(comment.createdAt) }})</em>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
  name: 'CommentsView',
  props: {
    reviewId: {
      type: String,
      required: true,
    },
    gameName: {
      type: String,
      required: true,
    },
    reviewUsername: {
      type: String,
      required: true,
    },
    // You can also pass the currently logged-in user's id if needed
    userId: {
      type: Number,
      required: false,
    }
  },
  setup(props) {
    const comments = ref([]);
    const loading = ref(true);
    const newComment = ref("");
    const posting = ref(false);

    const fetchComments = async () => {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/review/review/${props.reviewId}/comments`);
        comments.value = response.data;
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        loading.value = false;
      }
    };

    const submitComment = async () => {
      if (newComment.value.trim() === "") return;
      posting.value = true;
      try {
        const payload = {
          reviewId: props.reviewId,
          userId: props.userId,
          comment: newComment.value.trim(),
        };
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/review/review/comment`, payload);
        comments.value.push({
          id: response.data.id,
          reviewId: props.reviewId,
          userId: props.userId,
          comment: newComment.value.trim(),
          createdAt: response.data.createdAt,
          username: props.reviewUsername,
        });
        newComment.value = "";
      } catch (error) {
        console.error("Error posting comment:", error);
      } finally {
        posting.value = false;
      }
    };

    const formatDate = dateStr => new Date(dateStr).toLocaleDateString();

    onMounted(fetchComments);

    return {
      comments,
      loading,
      newComment,
      posting,
      submitComment,
      formatDate
    };
  },
};
</script>

<style scoped>
/* Styles here remain the same */
.comments-container {
  max-width: 600px;
  margin: 10px auto;
  font-family: 'Cinzel', serif;
}
.new-comment {
  padding: 16px;
  background-color: #e8cd74;
  border-radius: 6px;
  margin-bottom: 24px;
}
.new-comment h2 {
  margin-bottom: 12px;
}
.new-comment textarea {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  font-family: 'Cinzel', serif;
  margin-right: 10px;
}
.new-comment button {
  padding: 10px;
  margin-top: 10px;
  background-color: #B08D57;
  /* Gold color for medieval feel */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  /* Add smooth transitions */

}

.new-comment button:hover {
  background-color: #DAA520;
  /* Darker gold for hover effect */
  transform: scale(1.05);
}
.new-comment button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.existing-comments h1 {
  margin-bottom: 16px;
}
.existing-comments ul {
  list-style-type: none;
  padding: 0;
}
.existing-comments li {
  padding: 8px;
  border-bottom: 1px solid #e0e0e0;
}
.existing-comments li strong {
  color: #333;
}
.existing-comments li em {
  font-size: 12px;
  color: #666;
  margin-left: 8px;
}
</style>
