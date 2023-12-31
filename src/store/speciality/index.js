import { fetchWithGet } from "@/services/axios";
import { ERRORS } from "../../constants/pages";

const state = {
  speciality: null,
  serviceError: false,
};

const getters = {
  getSpeciality: (state) => state.speciality,
  serviceError: (state) => state.serviceError,
};

const mutations = {
  SET_SPECIALITY(state, data) {
    state.speciality = data;
  },
  SET_SERVICE_ERROR(state, value) {
    state.serviceError = value;
  },
};

const actions = {
  setSpeciality({ commit }, data) {
    commit("SET_SPECIALITY", data);
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
  async fetchSpeciality({ dispatch }) {
    try {
      const response = await fetchWithGet("/speciality");
      const speciality = response.data;
      dispatch("setSpeciality", speciality);
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
