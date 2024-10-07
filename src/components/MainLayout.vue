<template>
  <div class="layoutContainer">
    <slot></slot> <!-- This will render the children passed to the layout -->
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
});
</script>

<style scoped>
.layoutContainer {
  display: flex; /* Add display style if needed */
  flex-direction: column; /* Adjust layout direction as needed */
  gap: 10px; /* Adjust gap value as needed */
  padding: 10px; /* Optional padding for the entire layout */
}
</style>
