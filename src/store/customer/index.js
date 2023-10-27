import { fetchWithGet, updateRecord } from "@/services/axios";
import { ERRORS, INFO } from "../../constants/pages";

const state = {
  customer: null,
  serviceError: false,
  isCustomerAdded: false,
  isCustomerUpdated: false,
};

const getters = {
  getCustomer: (state) => state.customer,
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
  setServiceError({ commit, dispatch }, value) {
    commit("SET_SERVICE_ERROR", value);
    dispatch("setErrorRibbonVisibility");
  },
  setErrorRibbonVisibility({ commit }) {
    setTimeout(() => {
      commit("SET_SERVICE_ERROR", false);
    }, ERRORS.TIMEOUT);
  },
  setIsCustomerAdded({ commit }, value) {
    commit("SET_IS_CUSTOMER_ADDED", value);
  },
  setIsCustomerUpdated({ commit, dispatch }, value) {
    commit("SET_IS_CUSTOMER_UPDATED", value);
    dispatch("setInfoRibbonVisibility");
  },
  setInfoRibbonVisibility({ commit }) {
    setTimeout(() => {
      commit("SET_IS_CUSTOMER_UPDATED", false);
    }, INFO.TIMEOUT);
  },
  async fetchCustomer({ commit, dispatch }) {
    try {
      const response = await fetchWithGet("/customer");
      const customer = response.data;
      commit("SET_CUSTOMER", customer);
    } catch (error) {
      console.error("Service Error while fetch stock details. ", error);

      dispatch("setServiceError", true);
    }
  },
  async updateCustomer({ dispatch }, updatedValue) {
    try {
      await updateRecord("/customer", updatedValue.id, updatedValue);
      dispatch("fetchCustomer");
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
