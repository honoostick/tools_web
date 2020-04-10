import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // store data

  },
  mutations: {
    // modify state
    save(state, payload) {
      state = {
        ...state,
        ...payload,
      }
    },
  },
  actions: {
    // async func, call mutation
  },
  modules: {
    // manage by modules
  },
});
