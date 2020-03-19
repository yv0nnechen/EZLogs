import "@mdi/font/css/materialdesignicons.css"; //https://materialdesignicons.com/
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "./../sass/overrides.sass";

Vue.use(Vuetify);

const opts = {
  icons: {
    iconfont: "mdi" // default - only for display purposes
  }
};

export default new Vuetify(opts);
