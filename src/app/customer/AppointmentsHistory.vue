<template>
  <div class="appointments">
    <div class="appointments__wrapper">
      <h2 class="appointments__title">{{ APPOINTMENT_HISTORY.TITLE }}</h2>
      <div class="appointments__body">
        <ul class="appointments__ul">
          <li
            class="appointments__list"
            v-for="appointment in customerAppointments"
            :key="appointment.id"
          >
            <h3 class="appointments__stylist">{{ appointment.stylistName }}</h3>
            <p class="appointments__description">
              Appointment made on {{ appointment.date }} for
              {{ appointment.service }}
            </p>
          </li>
          <li v-if="!isAppointmentPresent">
            {{ APPOINTMENT_HISTORY.NO_APPOINTMENT }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { APPOINTMENT_HISTORY } from "../../constants/pages";

const store = useStore();

// computed
const id = computed(() => {
  const customer = store.getters["customerStore/getCustomer"];
  return customer ? customer.id : null;
});
const appointments = computed(() => {
  const appointmentsData = store.getters["appointmentStore/getAppointments"];

  if (appointmentsData) {
    return appointmentsData;
  }

  return null;
});
const customerAppointments = computed(() => {
  if (appointments.value) {
    return appointments.value.filter(
      (appointment) => appointment.customerId === id.value
    );
  }
  return null;
});
const isAppointmentPresent = computed(
  () => customerAppointments.value && customerAppointments.value.length
);

// life cycle hooks
onMounted(() => {
  if (!appointments.value) {
    store.dispatch("appointmentStore/fetchAppointments");
  }
});
</script>

<style scoped>
.appointments {
  padding: 2rem 0;
}
.appointments__title {
  font-size: 3.6rem;
  font-weight: normal;
  line-height: 1;
}
.appointments__ul {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: stretch;

  padding: 0;
  margin: -1rem;
  list-style: none;
}
.appointments__list {
  flex: 0 1 32%;
  padding: 1rem;
  margin: 0 0.5rem 1rem;
  border: 0.1rem solid black;
  border-radius: 0.5rem;
}
.appointments__stylist {
  font-size: 1.5rem;
}
.appointments__description {
  font-size: 1.3rem;
}
</style>
