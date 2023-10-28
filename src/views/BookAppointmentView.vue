<template>
  <div class="bookAppointmentView">
    <div class="bookAppointmentView__wrappper">
      <BookAppointment />
    </div>
  </div>
</template>

<script setup>
import BookAppointment from "../app/stylist/BookAppointment.vue";
</script>

<style scoped>
.bookAppointmentView {
  padding: 2rem 0;
}
.bookAppointmentView__wrappper {
  max-width: 120rem;
  margin: 0 auto;
}
</style>
