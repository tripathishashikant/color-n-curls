<template>
  <div class="notFoundView">
    <div class="notFoundView__wrappper">
      <NotFound />
    </div>
  </div>
</template>

<script setup>
import NotFound from "../app/shared/NotFound.vue";
</script>

<style scoped>
.notFoundView {
  padding: 2rem 0;
}
.notFoundView__wrappper {
  max-width: 120rem;
  margin: 0 auto;
}
</style>
