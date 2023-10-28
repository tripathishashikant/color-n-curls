import { createRouter, createWebHistory } from "vue-router";
import {
  DEFAULT_BROWSER_TITLE,
  HOME,
  LOGIN,
  APPOINTMENT_HISTORY,
  PROFILE,
  BOOK_APPOINTMENT,
} from "../constants/pages";
import store from "../store";

import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import AppointmentHistory from "../views/AppointmentHistoryView.vue";
import Profile from "../views/ProfileView.vue";
import BookAppointment from "../views/BookAppointmentView.vue";

const routes = [
  {
    name: "root",
    path: "/",
    redirect: "/home",
  },
  {
    name: "home",
    path: "/home",
    component: HomeView,
    meta: { title: HOME.BROWSER_TITLE },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { title: LOGIN.BROWSER_TITLE },
  },
  {
    path: "/appointment-history",
    name: "appointmentHistory",
    component: AppointmentHistory,
    meta: {
      requiresAuth: true,
      title: APPOINTMENT_HISTORY.BROWSER_TITLE,
    },
  },
  {
    path: "/book-appointment",
    name: "bookAppointment",
    component: BookAppointment,
    meta: {
      requiresAuth: true,
      title: BOOK_APPOINTMENT.BROWSER_TITLE,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      requiresAuth: true,
      title: PROFILE.BROWSER_TITLE,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  store,
});

router.beforeEach((to, form, next) => {
  // Update the document title based on the route's meta.title
  document.title = to.meta.title || DEFAULT_BROWSER_TITLE;

  // login gaurd
  const isNotAuthenticated = !store.getters["loginStore/isAuthenticated"];

  if (to.meta.requiresAuth && isNotAuthenticated) {
    next({ name: "login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
