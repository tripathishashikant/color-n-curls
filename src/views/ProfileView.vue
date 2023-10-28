<template>
  <div class="profileView">
    <div class="profileView__wrapper">
      <UpdateProfile />
    </div>
  </div>
</template>

<script setup>
import UpdateProfile from "../app/customer/UpdateProfile.vue";
</script>

<style scoped>
.profileView {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;

  margin: 2rem 0;
}
.profileView__wrapper {
  width: 100%;
  max-width: 50%;
  padding: 1rem 0;
  box-shadow: 0px 1px 3px -1px rgba(0, 0, 0, 0.74);
  background-color: #ece3d5;
}
</style>
