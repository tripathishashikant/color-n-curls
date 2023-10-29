<template>
  <nav class="navigation">
    <div class="navigation__logo">
      <TheLogo />
    </div>
    <div class="navigation__links">
      <div class="navigation__unAuthenticatedLinks" v-if="!isAuthenticated">
        <router-link
          to="/login"
          class="navigation__link navigation__link--login"
        >
          {{ LOGIN.TITLE }}
        </router-link>
      </div>
      <div class="navigation__authenticatedLinks" v-if="isAuthenticated">
        <router-link
          to="/appointment-history"
          class="navigation__link navigation__link--appointmentHistory"
        >
          {{ APPOINTMENT_HISTORY.TITLE }}
        </router-link>
        <router-link
          to="/book-appointment"
          class="navigation__link navigation__link--bookedAppointment"
        >
          {{ BOOK_APPOINTMENT.TITLE }}
        </router-link>
        <div class="navigation__link navigation__link--user">
          <span>{{ customerName }}</span>
          <div class="navigation__dropdown">
            <ul>
              <li>
                <router-link
                  to="/profile"
                  class="navigation__link navigation__link--updateProfile"
                >
                  {{ PROFILE.TITLE }}
                </router-link>
              </li>
              <li>
                <a
                  class="navigation__link navigation__link--logout"
                  @click="logout"
                >
                  {{ LOGIN.LOGOUT_TITLE }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
  LOGIN,
  APPOINTMENT_HISTORY,
  BOOK_APPOINTMENT,
  PROFILE,
} from "../../constants/pages";
import TheLogo from "./TheLogo.vue";

const store = useStore();
const router = useRouter();

// computed
const isAuthenticated = computed(
  () => store.getters["loginStore/isAuthenticated"]
);
const customerName = computed(
  () => store.getters["customerStore/getCustomerName"]
);

// methods
const logout = () => {
  store.dispatch("loginStore/logout");
  router.push("/login");
};
</script>

<style scoped>
.navigation {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;

  padding: 0 0 0 1.5rem;
}
.navigation__link {
  display: inline-block;
  padding: 1rem 1.5rem;
  font-size: 1.6rem;
  color: white;
  cursor: pointer;
  text-decoration: none;
}
.navigation__link:hover,
.navigation__link--active {
  background-color: orange;
}
.navigation__link--user {
  position: relative;
}
.navigation__link--user:hover .navigation__dropdown {
  display: block;
}
.navigation__dropdown {
  padding: 1rem 0;
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  border: 0.1rem solid transparent;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0 0 3px 0 black;
}
.navigation__dropdown ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.navigation__dropdown a {
  display: block;
  padding: 1rem;

  font-size: 1.4rem;
  white-space: nowrap;
  color: black;
}
.navigation__logo {
  flex: 0 1 20rem;
}
</style>
