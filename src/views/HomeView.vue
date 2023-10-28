<template>
  <TheBanner />
</template>

<script setup>
import TheBanner from "../app/shared/TheBanner.vue";
</script>

<style scoped>
.home {
  padding: 2rem 0;
  text-align: center;
}
.home__title {
  font-size: 3.6rem;
  font-weight: normal;
  line-height: 1;
  color: orange;
  letter-spacing: 0.2rem;
  text-shadow: -0.1rem -0.1rem 0 black, 0.1rem -0.1rem 0 black,
    -0.1rem 0.1rem 0 black, 0.1rem 0.1rem 0 black;
}
.home__subTitle {
  margin-top: 5rem;

  font-size: 3.4rem;
  line-height: 1;
  color: white;
  letter-spacing: 0.3rem;
  text-shadow: -0.1rem -0.1rem 0 black, 0.1rem -0.1rem 0 black,
    -0.1rem 0.1rem 0 black, 0.1rem 0.1rem 0 black;
}
</style>
