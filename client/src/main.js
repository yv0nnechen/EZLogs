// import 'bootstrap';
// import './scss/app.scss';

import Vue from "vue";
import App from "./AppMain.vue";
import router from "@/router";
import { store } from "@/store";
import "@/plugins/base";
import "@/plugins/chartist";
import vuetify from "@/plugins/vuetify";

const fb = require("@/config/firebaseConfig.js");

Vue.config.productionTip = false;

// handle page reloads
let app;
fb.auth.onAuthStateChanged(user => {
  console.log("auth state changed");
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      vuetify,
      render: h => h(App)
    });
  }
});

Vue.config.devtools = true;

// https://blog.gsmart.in/single-page-apps-vue-bootstrap-on-google-apps-script/
