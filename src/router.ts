import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { HomePage } from './pages/';
import firebase from 'firebase';


Vue.use(VueRouter);

const routes: RouteConfig[] = [

  {
    path: '/',
    component: HomePage,
    props: true,
    meta: {
      title: 'LIG - Lisk Italian Group'
    }
  },

  {path: '*', redirect: '/'}
];

export const router = new VueRouter({
  mode: 'history',
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (firebase.auth().currentUser == null) {
      return next('/auth');
    }
    if (!firebase.auth().currentUser.emailVerified) {
      return next('/verifyEmail');
    }
  }

  document.title = to.meta.title;
  return next();
});