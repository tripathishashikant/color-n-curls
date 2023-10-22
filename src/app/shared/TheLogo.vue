<template>
  <div class="logo">
    <router-link to="/" class="logo__link"> {{ logoTitle }} </router-link>
  </div>
</template>

<script setup>
import { HOME } from "../../constants/pages.js";

const logoTitle = HOME.TITLE;
</script>

<style scoped>
.logo__link {
  font-size: 1.6rem;
  color: white;
  text-decoration: none;
}
</style>
