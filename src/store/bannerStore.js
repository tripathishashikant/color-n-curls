const state = {
  title: "Color 'N' Curls",
  subTitle: "Your Beauty is Our Duty!",
};

const getters = {
  getTitle: (state) => state.title,
  getSubTitle: (state) => state.subTitle,
};

const mutations = {
  SET_TITLE(state, title) {
    state.title = title;
  },
  SET_SUBTITLE(state, title) {
    state.subTitle = title;
  },
};

const actions = {
  setTitle({ commit }, title) {
    commit("SET_TITLE", title);
  },
  setSubTitle({ commit }, title) {
    commit("SET_SUBTITLE", title);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
