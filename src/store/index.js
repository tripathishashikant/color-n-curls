import { createStore } from "vuex";
import bannerStore from "./banner";
import loginStore from "./login";
import customerStore from "./customer";
import appointmentStore from "./appointments";

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
  },
});

export default store;
