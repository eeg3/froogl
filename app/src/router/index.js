import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home.vue";

import Profile from "../components/cognito-auth/Profile.vue";
import Login from "../components/cognito-auth/Login.vue";
import Signup from "../components/cognito-auth/Signup.vue";
import Confirm from "../components/cognito-auth/Confirm.vue";
import PasswordChange from "../components/cognito-auth/PasswordChange.vue";
import PasswordReset from "../components/cognito-auth/PasswordReset.vue";
import PasswordResetConfirm from "../components/cognito-auth/PasswordResetConfirm.vue";

import cognitoAuth from "../cognito";
Vue.use(Router);

function requireAuth(to, from, next) {
  cognitoAuth.isAuthenticated((err, loggedIn) => {
    if (err) return next();
    if (!loggedIn) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  });
}

export default new Router({
  linkActiveClass: "active",
  mode: "history",
  base: __dirname,
  routes: [
    {
      path: "/",
      component: Home,
      beforeEnter: requireAuth
    },
    {
      path: "/profile",
      component: Profile,
      beforeEnter: requireAuth
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/signup",
      component: Signup
    },
    {
      path: "/confirm",
      component: Confirm
    },
    {
      path: "/change_password",
      component: PasswordChange,
      beforeEnter: requireAuth
    },
    {
      path: "/reset_password",
      component: PasswordReset
    },
    {
      path: "/confirm_reset_password",
      component: PasswordResetConfirm
    },
    {
      path: "/logout",
      beforeEnter(to, from, next) {
        cognitoAuth.logout();
        next("/login");
      }
    }
  ]
});
