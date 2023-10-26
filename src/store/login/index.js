import { fetchWithGet } from "@/services/axios";
const state = {
  user: null,
  invalidUser: false,
  fetchUserError: false,
  redirectTo: null,
};

const getters = {
  isAuthenticated: (state) => state.user !== null,
  isInvalidUser: (state) => state.invalidUser,
  isfetchUserError: (state) => state.fetchUserError,
  redirectTo: (state) => state.redirectTo,
  getUser: (state) => state.user,
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_INVALID_USER_ERROR(state, value) {
    state.invalidUser = value;
  },
  SET_FETCH_USER_ERROR(state, value) {
    state.fetchUserError = value;
  },
  SET_REDIRECT_TO(state, value) {
    state.redirectTo = value;
  },
};

const actions = {
  setUser({ commit }, user) {
    commit("SET_USER", user);
  },
  setInvalidUserError({ commit }, value) {
    commit("SET_INVALID_USER_ERROR", value);
  },
  setFetchUserError({ commit }, value) {
    commit("SET_FETCH_USER_ERROR", value);
  },
  setRedirectTo({ commit }, value) {
    commit("SET_REDIRECT_TO", value);
  },
  async login({ commit, dispatch }, loginData) {
    try {
      const response = await fetchWithGet("/customer");
      const users = response.data;
      const currentUser = users.filter(
        (user) =>
          user.name === loginData.name && user.password === loginData.password
      );

      if (currentUser.length > 0) {
        commit("SET_USER", currentUser[0]);
        dispatch("setRedirectTo", "/home");
        dispatch("setInvalidUserError", false);
      } else {
        dispatch("setInvalidUserError", true);
      }
    } catch (error) {
      const { config } = error;

      if (config.url === "/customer") {
        dispatch("setFetchUserError", true);
      }

      console.error("Error fetching user data:", error);
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
