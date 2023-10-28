import { fetchWithGet } from "@/services/axios";
import { ERRORS } from "../../constants/pages";

const state = {
  appointments: null,
  serviceError: false,
};

const getters = {
  getAppointments: (state) => state.customer,
  serviceError: (state) => state.serviceError,
};

const mutations = {
  SET_APPOINTMENTS(state, data) {
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
  setServiceError({ commit, dispatch }, value) {
    commit("SET_SERVICE_ERROR", value);
    dispatch("setErrorRibbonVisibility");
  },
  setErrorRibbonVisibility({ commit }) {
    setTimeout(() => {
      commit("SET_SERVICE_ERROR", false);
    }, ERRORS.TIMEOUT);
  },
  async fetchAppointments({ commit, dispatch }) {
    try {
      const response = await fetchWithGet("/appointment");
      const appointments = response.data;
      commit("SET_APPOINTMENTS", appointments);
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
