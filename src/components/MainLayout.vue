<template>
  <div :class="layoutContainer">
    <slot></slot> <!-- This will render the children passed to the layout -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    return {
      layoutContainer: 'layoutContainer' // Ensure this is a string that matches your CSS class
    };
  },
});
</script>

<style scoped>
.layoutContainer {
  gap: 20px; /* Adjust gap value as needed */
  padding: 20px; /* Optional padding for the entire layout */
}
</style>
