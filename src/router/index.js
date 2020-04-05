import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index';


import Login from '@/components/login/Login';
// import Dashboard from '@/components/dashboard/Dashboard';
import ConcreteCalculator from '@/components/calculator/Calculator';
import Schedule from '@/components/schedule/ScheduleDashboard';
import ConcreteForm from '@/components/schedule/ConcreteForm';

// import Settings from '@/components/Settings'

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/calculator',
    },
    {
      name: 'Login',
      path: '/login',
      component: Login,
    },
    // Dashboard
    // {
    //   name: 'Dashboard',
    //   path: '/dashboard',
    //   components: {
    //     appmain: Dashboard,
    //   },
    //   meta: {
    //     requiresAuth: true,
    //   },
    // },
    {
      name: 'Calculator',
      path: '/calculator',
      components: {
        appmain: ConcreteCalculator,
      },
      meta: {
        requiresAuth: false,
      },
    },
    {
      name: 'Schedule',
      path: '/schedules',
      components: {
        appmain: Schedule,
      },
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'concretes/new',
          components: {
            ConcreteForm,
          },
        },
        {
          path: 'rebars',
        },
        {
          path: 'equipments',
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log('from route %o, to %o', from, to);

  const checkAuth = () => {
    const { currentUser } = store.state.user;
    const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
    if (requiresAuth && !currentUser) {
      next('/login');
    } else if (requiresAuth && currentUser) {
      next();
    } else {
      next();
    }
  };

  if (!store.state.initialized) {
    store.dispatch('initialize').then(() => {
      checkAuth();
    });
  } else {
    checkAuth();
  }
});

export default router;
