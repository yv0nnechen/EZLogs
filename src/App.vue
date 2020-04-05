<template>
  <div>
    <Navigation v-if="currentUser"></Navigation>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Navigation from '@/components/Navigation';

export default {
  // name: 'App',
  components: { Navigation },
  computed: {
    ...mapState('user', ['currentUser']),

    // ...mapState({
    //   currentUser: (state) => state.user.currentUser,
    // }),
  },
  // beforeCreate() {
  //   console.log('Dispatching init current user');
  //   this.$store.dispatch('user/initCurrentUser');
  // },
};
</script>
