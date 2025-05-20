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
  font-family: 'Cinzel', serif;
  /* Example of a medieval-inspired font */
  display: flex;
  /* Add display style if needed */
  flex-direction: column;
  /* Adjust layout direction as needed */
  gap: 0px;
  /* Adjust gap value as needed */
  padding: 0px;
  /* Optional padding for the entire layout */
}
</style>
