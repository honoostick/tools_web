import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // store data
    tabData: [
      {
        type: 0,
        name: '全部',
      },
      {
        type: 1,
        name: '品类1',
      },
      {
        type: 2,
        name: '品类2',
      },
      {
        type: 3,
        name: '品类3',
      },
      {
        type: 4,
        name: '品类4',
      },
      {
        type: 5,
        name: '品类5',
      },
    ],
  },
  mutations: {
    // modify state
  },
  actions: {
    // async func, call mutation
  },
  modules: {
    // manage by modules
  },
});
