import '@mdi/font/css/materialdesignicons.css'; // https://materialdesignicons.com/
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@/sass/overrides.sass';
import ConcreteIcon from '@/components/svg/ConcreteIcon';
import RebarIcon from '@/components/svg/RebarIcon';
import Machinery from '@/components/svg/MachineryIcon';

Vue.use(Vuetify);

const opts = {
  icons: {
    iconfont: 'mdi', // default - only for display purposes
    values: {
      concrete: { // name of our custom icon
        component: ConcreteIcon, // our custom component
      },
      rebar: {
        component: RebarIcon,
      },
      machinery: {
        component: Machinery,
      },
    },
  },
  theme: {
    themes: {
      dark: {
        primary: '#457B9D',
        accent: '#E63946',
        secondary: '#1D3557',
        success: '#459E7D',
        info: '#A8DADC',
        warning: '#F4A261',
        error: '#FF5252',
      },
      light: {
        primary: '#457B9D',
        accent: '#E63946',
        secondary: '#1D3557',
        success: '#459E7D',
        info: '#A8DADC',
        warning: '#F4A261',
        error: '#FF5252',
      },
    },
  },
};

export default new Vuetify(opts);
