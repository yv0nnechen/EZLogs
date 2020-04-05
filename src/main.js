/* eslint-disable import/extensions */
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';
import '@/plugins/base';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

// // import 'bootstrap';
// // import './scss/app.scss';

// import "@/plugins/base";
// import "@/plugins/chartist";
// import vuetify from "@/plugins/vuetify";

// const fb = require("@/config/firebaseConfig.js");

// Vue.config.productionTip = false;
// Vue.config.devtools = true;

// // handle page reloads
// let app;
// fb.auth.onAuthStateChanged(user => {
//   console.log("auth state changed");
//   if (!app) {
//     app = new Vue({
//       el: '#app',
//       router,
//       store,
//       vuetify,
//       render: h => h(App)
//     });
//   }
// });

// Vue.config.devtools = true;

// https://blog.gsmart.in/single-page-apps-vue-bootstrap-on-google-apps-script/
