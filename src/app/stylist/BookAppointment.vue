<template>
  <div class="bookAppointment">
    <div class="bookAppointment__wrapper">
      <p class="info__ribbon" v-if="isAppointmentAdded">
        {{ INFO.BOOKED_SUCCESSFULLY }}
      </p>
      <h2 class="bookAppointment__title">{{ BOOK_APPOINTMENT.SUBTITLE }}</h2>
      <h3 class="bookAppointment__subtitle">
        {{ BOOK_APPOINTMENT.DESCRIPTION }}
      </h3>
      <div class="bookAppointment__body">
        <ul class="bookAppointment__ul">
          <li
            class="bookAppointment__li"
            v-for="spec in speciality"
            :key="spec.id"
          >
            <button
              class="bookAppointment__speciality"
              :class="{
                'bookAppointment__speciality--active':
                  currentSpeciality === spec.speciality,
              }"
              @click="showStylist(spec.speciality)"
            >
              {{ spec.speciality }}
            </button>
          </li>
        </ul>
      </div>
      <div class="bookAppointment__stylistWrapper">
        <div class="bookAppointment__stylistTitle" v-if="currentSpeciality">
          <p>Speciality in {{ currentSpeciality }}</p>
        </div>
        <div class="bookAppointment__stylist" v-if="filteredStylist">
          <div
            class="bookAppointment__stylistList"
            v-for="stylist in filteredStylist"
            :key="stylist.id"
          >
            <h4 class="bookAppointment__stylistName">{{ stylist.name }}</h4>
            <p class="bookAppointment__stylistExperience">
              {{ stylist.experience }} yr experience
            </p>
            <ul class="bookAppointment__availability">
              <li
                class="bookAppointment__availabilityList"
                v-for="(value, key) in stylist.available"
                :key="stylist.id + '-' + value"
              >
                <button
                  class="bookAppointment__day"
                  :class="{
                    active: activeDaysBtn === stylist.name + '-' + key,
                  }"
                  @click="availableSlot(stylist.name + '-' + key, stylist.id)"
                >
                  {{ key }}
                </button>
                <p
                  class="bookAppointment__daySlot"
                  :class="{
                    show: activeSlot === stylist.name + '-' + key,
                  }"
                >
                  {{ value }} slot available
                </p>
              </li>
            </ul>
            <div class="bookAppointment__book">
              <button
                class="bookAppointment__bookBtn"
                :disabled="activeBookBtn !== stylist.id"
                @click="bookAppointment(stylist)"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { BOOK_APPOINTMENT, INFO } from "../../constants/pages";

const store = useStore();

const currentSpeciality = ref(null);
const activeDaysBtn = ref(null);
const activeSlot = ref(null);
const activeBookBtn = ref(null);

// computed
const customerId = computed(() => {
  const customer = store.getters["customerStore/getCustomer"];
  return customer ? customer.id : null;
});
const speciality = computed(
  () => store.getters["specialityStore/getSpeciality"]
);
const stylist = computed(() => store.getters["stylistStore/getStylist"]);
const filteredStylist = computed(() => {
  if (stylist.value) {
    return stylist.value.filter(
      (style) => style.speciality === currentSpeciality.value
    );
  }

  return false;
});
const isAppointmentAdded = computed(
  () => store.getters["appointmentStore/isAppointmentAdded"]
);

// life cycle hooks
onMounted(() => {
  if (speciality.value === null) {
    store.dispatch("specialityStore/fetchSpeciality");
  }

  if (stylist.value === null) {
    store.dispatch("stylistStore/fetchStylist");
  }
});

// methods
const showStylist = (speciality) => {
  currentSpeciality.value = speciality;
};
const availableSlot = (eleId, stylistId) => {
  activeDaysBtn.value = eleId;
  activeSlot.value = eleId;
  activeBookBtn.value = stylistId;
};
const bookAppointment = (stylist) => {
  let day = null;
  const { id, name, experience, speciality, available } = stylist;

  if (activeSlot.value) {
    const temp = activeSlot.value.split("-");

    if (Array.isArray(temp)) {
      day = temp[temp.length - 1];
    } else {
      day = temp;
    }
  }

  if (typeof available === "object" && available !== null) {
    for (let key in available) {
      if (key === day) {
        available[key]--;
      }
    }
  }

  store.dispatch("stylistStore/updateStylist", {
    id,
    name,
    experience,
    speciality,
    available,
  });

  const bookingDetails = {
    stylistName: name,
    stylistId: id,
    customerId: customerId.value,
    date: day,
    service: speciality,
  };

  store.dispatch("appointmentStore/addAppointment", bookingDetails);
};
</script>

<style scoped>
.bookAppointment__title {
  margin: 2rem 0 1rem;
  font-size: 2rem;
  line-height: 1;
}
.bookAppointment__subtitle {
  margin: 0 0 2rem;
  font-size: 1.6rem;
  font-weight: 300;
  line-height: 1;
}
.bookAppointment__ul {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: stretch;

  position: relative;
  padding: 0;
  list-style: none;
}
.bookAppointment__li {
  flex: 0 1 18%;
}
.bookAppointment__stylist {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: stretch;
  margin: 0 -1rem;
}
.bookAppointment__stylistList {
  flex: 0 1 30%;
  padding: 2rem 1rem;
  border: 0.1rem solid black;
  border-radius: 0.5rem;
  background-color: rgb(203, 206, 184);
  margin: 0 0.5rem 1rem;
}
.bookAppointment__stylistName {
  margin: 0;
  font-weight: 500;
}
.bookAppointment__stylistExperience {
  margin-top: 0;
  font-size: 1.2rem;
  font-weight: 200;
}
.bookAppointment__speciality {
  width: 100%;
  padding: 1rem 2rem;
  font-weight: normal;
  color: black;
  border: 1px solid black;
  border-radius: 0.3rem;
  background-color: rgb(150, 197, 199);
}
.bookAppointment__speciality:hover,
.bookAppointment__speciality--active {
  background-color: rgb(108, 227, 232);
}
.bookAppointment__availability {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: stretch;

  position: relative;
  padding: 0;
  list-style: none;
}
.bookAppointment__availabilityList {
  flex: 0 1 auto;
}
.bookAppointment__day {
  font-size: 1.2rem;
  font-weight: 200;
  color: black;
  text-transform: uppercase;
  border: 0.1rem solid black;
  border-radius: 0.3rem;
  background-color: rgb(150, 197, 199);
}
.bookAppointment__day:hover,
.bookAppointment__day.active {
  background-color: rgb(127, 232, 235);
}
.bookAppointment__daySlot {
  display: none;
  width: 50%;
  margin: 0;

  position: absolute;
  left: 0;
  bottom: calc(-100% - 1rem);

  font-size: 1.2rem;
  font-weight: 200;
}
.bookAppointment__daySlot.show {
  display: block;
}
.bookAppointment__book {
  text-align: right;
}
.bookAppointment__bookBtn {
  width: 50%;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  font-weight: 300;
}
</style>
