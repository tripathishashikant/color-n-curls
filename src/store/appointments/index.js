import { fetchWithGet, fetchWithPost } from "@/services/axios";
import { ERRORS, INFO } from "../../constants/pages";

const state = {
  appointments: null,
  serviceError: false,
  isAppointmentAdded: false,
};

const getters = {
  getAppointments: (state) => state.customer,
  serviceError: (state) => state.serviceError,
  isAppointmentAdded: (state) => state.isAppointmentAdded,
};

const mutations = {
  SET_APPOINTMENTS(state, data) {
    state.customer = data;
  },
  SET_SERVICE_ERROR(state, value) {
    state.serviceError = value;
  },
  SET_IS_APPOINTMENT_ADDED(state, value) {
    state.isAppointmentAdded = value;
  },
};

const actions = {
  setAppointment({ commit }, data) {
    commit("SET_APPOINTMENTS", data);
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
  setIsAppointmentAdded({ commit, dispatch }, value) {
    commit("SET_IS_APPOINTMENT_ADDED", value);
    dispatch("setInfoRibbonVisibility", "SET_IS_APPOINTMENT_ADDED");
  },
  setInfoRibbonVisibility({ commit }, muttionName) {
    setTimeout(() => {
      commit(muttionName, false);
    }, INFO.TIMEOUT);
  },
  async fetchAppointments({ dispatch }) {
    try {
      const response = await fetchWithGet("/appointment");
      const appointments = response.data;
      dispatch("setAppointment", appointments);
    } catch (error) {
      console.error("Service Error while fetch stock details. ", error);

      dispatch("setServiceError", true);
    }
  },
  async addAppointment({ dispatch }, bookingDetails) {
    try {
      await fetchWithPost("/appointment", bookingDetails);
      dispatch("setIsAppointmentAdded", true);
      dispatch("fetchAppointments");
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
