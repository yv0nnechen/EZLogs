<template>
  <v-app>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />

    <dashboard-core-settings />
  </v-app>
</template>

<script>
  const fb = require('@/config/firebaseConfig.js');

  export default {
    name: 'Navigation',

    components: {
      DashboardCoreAppBar: () => import('./dashboard/components/core/AppBar'),
      DashboardCoreDrawer: () => import('./dashboard/components/core/Drawer'),
      DashboardCoreSettings: () => import('./dashboard/components/core/Settings'),
      DashboardCoreView: () => import('./dashboard/components/core/View'),
    },

    data: () => ({
      expandOnHover: false, 
    }),
  }
</script>
