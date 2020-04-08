import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Meta from 'vue-meta';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(Meta);
Vue.use(ElementUI);
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App),
  // mounted() {
  //   document.dispatchEvent(new Event("render-event"));
  // }
}).$mount("#app");
