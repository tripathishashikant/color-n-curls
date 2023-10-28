import { createStore } from "vuex";
import bannerStore from "./banner";
import loginStore from "./login";
import customerStore from "./customer";
import appointmentStore from "./appointments";
import specialityStore from "./speciality";
import stylistStore from "./stylist";

const mainState = {};

const getters = {};

const mutations = {};

const actions = {};

const store = createStore({
  state: mainState,
  getters,
  mutations,
  actions,
  modules: {
    bannerStore,
    loginStore,
    customerStore,
    appointmentStore,
    specialityStore,
    stylistStore,
  },
});

export default store;
