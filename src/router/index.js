import { createRouter, createWebHistory } from "vue-router";
import {
  DEFAULT_BROWSER_TITLE,
  HOME,
  LOGIN,
  BOOKED_APPOINTMENT,
} from "../constants/pages";
import store from "../store";

import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import BookedAppointments from "../views/BookedAppointmentsView.vue";

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
    path: "/booked-appointments",
    name: "booked",
    component: BookedAppointments,
    meta: {
      requiresAuth: true,
      title: BOOKED_APPOINTMENT.BROWSER_TITLE,
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
