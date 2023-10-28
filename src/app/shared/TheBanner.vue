<template>
  <div class="banner">
    <h1 class="banner__title">{{ title }}</h1>
    <h2 class="banner__subTitle">{{ subTitle }}</h2>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const title = computed(() => store.getters["bannerStore/getTitle"]);
const subTitle = computed(() => store.getters["bannerStore/getSubTitle"]);
</script>

<style scoped>
.banner {
  padding: 2rem 1.5rem;
  text-align: center;
}
.banner__title {
  font-size: 3.6rem;
  font-weight: 300;
  line-height: 1;
  color: goldenrod;
  letter-spacing: 0.2rem;
  text-shadow: -0.1rem -0.1rem 0 black, 0.1rem -0.1rem 0 black,
    -0.1rem 0.1rem 0 black, 0.1rem 0.1rem 0 black;
}
.banner__subTitle {
  margin-top: 5rem;

  font-size: 3.4rem;
  line-height: 1;
  color: maroon;
  font-weight: 100;
  letter-spacing: 0.3rem;
  text-shadow: -0.1rem -0.1rem 0 black, 0.1rem -0.1rem 0 black,
    -0.1rem 0.1rem 0 black, 0.1rem 0.1rem 0 black;
}
</style>
