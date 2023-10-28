import { fetchWithGet, updateRecord } from "@/services/axios";
import { ERRORS } from "../../constants/pages";

const state = {
  stylist: null,
  serviceError: false,
};

const getters = {
  getStylist: (state) => state.stylist,
  serviceError: (state) => state.serviceError,
};

const mutations = {
  SET_STYLIST(state, data) {
    state.stylist = data;
  },
  SET_SERVICE_ERROR(state, value) {
    state.serviceError = value;
  },
};

const actions = {
  setStylist({ commit }, data) {
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
  async fetchStylist({ commit, dispatch }) {
    try {
      const response = await fetchWithGet("/stylist");
      const stylist = response.data;
      commit("SET_STYLIST", stylist);
    } catch (error) {
      console.error("Service Error while fetch stock details. ", error);

      dispatch("setServiceError", true);
    }
  },
  async updateStylist({ dispatch }, stylist) {
    try {
      await updateRecord("/stylist", stylist.id, stylist);
      dispatch("fetchStylist");
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
