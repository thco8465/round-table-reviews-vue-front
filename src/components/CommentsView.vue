<!-- src/views/CommentsView.vue -->
<template>
  <div>
    <h1>Comments for Review {{ reviewId }}</h1>
    <!-- Your comments display logic goes here -->
    <div v-if="loading">Loading comments...</div>
    <ul v-else>
      <li v-for="comment in comments" :key="comment.id">
        <strong>{{ comment.username }}</strong>: {{ comment.comment }}
        <em>({{ formatDate(comment.createdAt) }})</em>
      </li>
    </ul>
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
  },
  setup(props) {
    const comments = ref([]);
    const loading = ref(true);
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/review/${props.reviewId}/comments`);
        comments.value = response.data;
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        loading.value = false;
      }
    };

    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

    onMounted(() => {
      fetchComments();
    });

    return { comments, loading, formatDate };
  },
};
</script>
