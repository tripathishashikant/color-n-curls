<template>
  <div class="appointmentsView">
    <div class="appointmentsView__wrappper">
      <AppointmentsHistory />
    </div>
  </div>
</template>

<script setup>
import AppointmentsHistory from "../app/customer/AppointmentsHistory.vue";
</script>

<style scoped>
.appointmentsView {
  padding: 2rem 0;
}
.appointmentsView__wrappper {
  max-width: 120rem;
  margin: 0 auto;
}
</style>
