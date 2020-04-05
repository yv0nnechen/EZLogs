<template>
  <v-app>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />

  </v-app>
</template>

<script>
import DashboardCoreAppBar from '@/components/core/AppBar';
import DashboardCoreDrawer from '@/components/core/Drawer';
import DashboardCoreView from '@/components/core/View';

// const fb = require('@/plugins/firebaseConfig.js');

export default {
  name: 'Navigation',

  components: {
    DashboardCoreAppBar,
    DashboardCoreDrawer,
    DashboardCoreView,
  },

  data: () => ({
    expandOnHover: false,
  }),
};
</script>
