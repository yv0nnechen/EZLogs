/* eslint-disable global-require */
import Vue from 'vue';
import Vuex from 'vuex';
import ui from '@/store/modules/ui';
import user from '@/store/modules/user';

const fb = require('@/plugins/firebaseConfig.js');

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    ui,
    user,
  },
  state: {
    initialized: false,
  },
  mutations: {
    initialized(state) {
      state.initialized = true;
    },
  },
  actions: {
    initialize(context) {
      return context.dispatch('loadCurrentUser').then(() => {
        context.commit('initialized');
      });
    },
    loadCurrentUser(context) {
      return new Promise((resolve) => {
        fb.auth.onAuthStateChanged((currentUser) => {
          if (currentUser) {
            context.commit('user/setCurrentUser', currentUser);
          } else {
            // No user is signed in.
          }
          resolve();
        });
      });
    },
  },
});

if (module.hot) {
  module.hot.accept([
    './modules/ui',
    './modules/user',
  ], () => {
    // eslint-disable-next-line global-require
    // const newUIModule = require('./modules/ui').default;
    store.hotUpdate({
      modules: {
        ui: require('./modules/ui').default,
        user: require('./modules/user').default,
      },
    });
  });
}


export default store;
