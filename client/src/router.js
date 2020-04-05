import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";

import Login from "@/views/Login";
import Dashboard from "@/views/dashboard/Dashboard";
import ConcreteCalculator from "@/views/calculator/Calculator";

// import Settings from '@/components/Settings'

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/dashboard"
    },
    {
      name: "Login",
      path: "/login",
      component: Login
    },
    // Dashboard
    {
      name: "Dashboard",
      path: "/dashboard",
      components: {
        appmain: Dashboard,
      },
      meta: {
        requiresAuth: true
      },
    },
    {
      name: "Calculator",
      path: "/calculator",
      components: {
        appmain: ConcreteCalculator,
      },
      meta: {
        requiresAuth: false
      },
    },
     // {
    //   name: "Settings",
    //   path: "/settings",
    //   component: Settings,
    //   meta: {
    //     requiresAuth: true
    //   }
    // }
   
  ]
});

router.beforeEach((to, from, next) => {
  console.log("from route %o, to %o", from, to);
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
