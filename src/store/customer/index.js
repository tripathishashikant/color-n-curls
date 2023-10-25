import { fetchWithPost } from "@/services/axios";

const state = {
  customer: null,
  serviceError: false,
};

const getters = {
  serviceError: (state) => state.serviceError,
};

const mutations = {
  SET_CUSTOMER(state, data) {
    state.customer = data;
  },
  SET_SERVICE_ERROR(state, value) {
    state.serviceError = value;
  },
};

const actions = {
  setCustomer({ commit }, data) {
    commit("SET_CUSTOMER", data);
  },
  setServiceError({ commit }, value) {
    commit("SET_SERVICE_ERROR", value);
  },
  async addCustomer({ dispatch }, newCustomer) {
    try {
      await fetchWithPost("/customer/tes", newCustomer);
    } catch (error) {
      console.error("Service Error while fetch stock details. ", error);

      dispatch("setServiceError", true);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
