<template>
  <div class="reviewCard">
    <div class="reviewCard__cover">
      <img :src="imageUrl" :alt="review.game_name" />
    </div>

    <h3 class="gameTitle">{{ review.game_name }}</h3>
    <p class="rating"><strong>Rating:</strong> {{ review.rating }}/10</p>
    <p class="reviewText"><strong>Review:</strong> {{ review.review }}</p>
    <p class="timeSpent"><strong>Playtime:</strong> {{ review.time_spent }}</p>
    <p v-if="review.username" class="username"><strong>Username:</strong> {{ review.username }}</p>
    <p class="date"><strong>Date:</strong> {{ formattedDate }}</p>
    <router-link :to="`/review_info_card/${review.id}`">Detail</router-link>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'ReviewCard',
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const imageUrl = computed(() =>
      props.review.cover.replace('{width}', '100').replace('{height}', '150')
    );

    const formattedDate = computed(() => {
      return new Date(props.review.date).toLocaleDateString();
    });

    return {
      imageUrl,
      formattedDate,
    };
  },
});
</script>

<style scoped>
.reviewCard {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.reviewCard__cover img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.gameTitle {
  font-size: 1.5rem;
  margin: 12px 0;
}

.rating,
.reviewText,
.timeSpent,
.username,
.date {
  margin: 8px 0;
}
</style>
