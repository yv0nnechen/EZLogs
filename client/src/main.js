// import 'bootstrap';
// import './scss/app.scss';

import Vue from "vue";
import App from "./AppMain.vue";
import router from "@/router";
import store from "@/store";
import "@/plugins/base";
import "@/plugins/chartist";
import vuetify from "@/plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

Vue.config.devtools = true;

// https://blog.gsmart.in/single-page-apps-vue-bootstrap-on-google-apps-script/
