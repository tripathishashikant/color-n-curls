import { createRouter, createWebHistory } from "vue-router";
import { DEFAULT_BROWSER_TITLE, HOME } from "../constants/pages";
import store from "../store";

import HomeView from "../views/HomeView.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  store,
});

router.beforeEach((to, from, next) => {
  // Update the document title based on the route's meta.title
  document.title = to.meta.title || DEFAULT_BROWSER_TITLE;
  next();
});

export default router;
