<template>
  <div class="notFoundView">
    <div class="notFoundView__wrappper">
      <h2 class="notFoundView">{{ NOT_FOUND.TITLE }}</h2>
      <p>
        Page not found! Maybe view our
        <router-link to="/"> {{ HOME.TITLE }} </router-link>?
      </p>
    </div>
  </div>
</template>

<script setup>
import { NOT_FOUND, HOME } from "../../constants/pages";
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
