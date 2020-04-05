const fb = require('@/plugins/firebaseConfig.js');

const userStore = {
  namespaced: true,
  state: {
    currentUser: null,
  },
  getters: {
    currentUser: (state) => state.currentUser,
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
  },
  actions: {
    clearData({ commit }) {
      commit('setCurrentUser', null);
      // commit('setUserProfile', {});
      // commit('setPosts', null);
      // commit('setHiddenPosts', null);
    },
    logout({ dispatch }) {
      return fb.auth
        .signOut()
        .then(() => {
          dispatch('clearData');
        });
    },
  },
};


export default userStore;
