import { fetchWithPost } from "@/services/axios";

const state = {
  customer: null,
  serviceError: false,
  isCustomerAdded: false,
};

const getters = {
  serviceError: (state) => state.serviceError,
  isCustomerAdded: (state) => state.isCustomerAdded,
};

const mutations = {
  SET_CUSTOMER(state, data) {
    state.customer = data;
  },
  SET_SERVICE_ERROR(state, value) {
    state.serviceError = value;
  },
  SET_IS_CUSTOMER_ADDED(state, value) {
    state.isCustomerAdded = value;
  },
};

const actions = {
  setCustomer({ commit }, data) {
    commit("SET_CUSTOMER", data);
  },
  setServiceError({ commit }, value) {
    commit("SET_SERVICE_ERROR", value);
  },
  setIsCustomerAdded({ commit }, value) {
    commit("SET_IS_CUSTOMER_ADDED", value);
  },
  async addCustomer({ dispatch }, newCustomer) {
    try {
      await fetchWithPost("/customer", newCustomer);
      dispatch("setIsCustomerAdded", true);
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
