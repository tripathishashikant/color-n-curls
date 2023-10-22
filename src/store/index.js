import { createStore } from "vuex";
import bannerStore from "./bannerStore";

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
  },
});

export default store;
