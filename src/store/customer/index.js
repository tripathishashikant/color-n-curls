import { fetchWithGet, fetchWithPost, updateRecord } from "@/services/axios";
import { ERRORS, INFO } from "../../constants/pages";

const state = {
  customer: null,
  serviceError: false,
  isCustomerAdded: false,
  isCustomerUpdated: false,
};

const getters = {
  getCustomer: (state) => state.customer,
  getCustomerName: (state) => state.customer && state.customer.name,
  serviceError: (state) => state.serviceError,
  isCustomerAdded: (state) => state.isCustomerAdded,
  isCustomerUpdated: (state) => state.isCustomerUpdated,
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
  SET_IS_CUSTOMER_UPDATED(state, value) {
    state.isCustomerUpdated = value;
  },
};

const actions = {
  setCustomer({ commit }, data) {
    commit("SET_CUSTOMER", data);
  },
  setErrorRibbonVisibility({ commit }) {
    setTimeout(() => {
      commit("SET_SERVICE_ERROR", false);
    }, ERRORS.TIMEOUT);
  },
  setServiceError({ commit, dispatch }, value) {
    commit("SET_SERVICE_ERROR", value);
    dispatch("setErrorRibbonVisibility");
  },
  setInfoRibbonVisibility({ commit }, muttionName) {
    setTimeout(() => {
      commit(muttionName, false);
    }, INFO.TIMEOUT);
  },
  setIsCustomerAdded({ commit, dispatch }, value) {
    commit("SET_IS_CUSTOMER_ADDED", value);
    dispatch("setInfoRibbonVisibility", "SET_IS_CUSTOMER_ADDED");
  },
  setIsCustomerUpdated({ commit, dispatch }, value) {
    commit("SET_IS_CUSTOMER_UPDATED", value);
    dispatch("setInfoRibbonVisibility", "SET_IS_CUSTOMER_UPDATED");
  },
  async fetchCustomer({ dispatch }, id) {
    try {
      const response = await fetchWithGet("/customer");
      const users = response.data;
      const currentUser = users.filter((user) => user.id === id);

      if (currentUser.length > 0) {
        dispatch("setCustomer", currentUser[0]);
      }
    } catch (error) {
      console.error("Service Error while fetch stock details. ", error);

      dispatch("setServiceError", true);
    }
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
  async updateCustomer({ dispatch }, updatedValue) {
    try {
      await updateRecord("/customer", updatedValue.id, updatedValue);
      dispatch("fetchCustomer", updatedValue.id);
      dispatch("setIsCustomerUpdated", true);
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
