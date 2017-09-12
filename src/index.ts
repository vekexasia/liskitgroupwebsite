import Vue from 'vue'

import * as firebase from 'firebase';
import * as VueCookie from 'vue-cookie';
import * as VueMaterial from 'vue-material';
import BigNumber from 'bignumber.js';
import * as VueClipboard from 'vue-clipboard2';
import { AppComponent } from './components';
import { router } from './router';
import { sprintf } from 'sprintf';
import { viewUtils } from './utils';
import { baseConfig } from './models';

firebase.initializeApp({
  apiKey           : "AIzaSyASAP1y-NipffJuICCj7Y0Zwbpk5FeEVis",
  authDomain       : "lisk-italian-group.firebaseapp.com",
  databaseURL      : "https://lisk-italian-group.firebaseio.com",
  projectId        : "lisk-italian-group",
  storageBucket    : "lisk-italian-group.appspot.com",
  messagingSenderId: "272981287890"
});
Vue.use(VueMaterial);
Vue.use(VueClipboard);
Vue.use(VueCookie);

Vue.mixin({data: () => ({viewUtils, baseConfig})});

Vue.filter('decimals', (value: number) => {
  return sprintf('%08d', ((value - (value | 0)) * Math.pow(10, 8)) | 0);
});
Vue.filter('truncated', (value: number) => value | 0);
Vue.filter('satoshiToString', (value: number | string) => {
  return new BigNumber(`${value}`)
    .div(Math.pow(10, 8))
    .toFixed(8);
});
new Vue({
  el    : '#app',
  router,
  render: h => h(AppComponent),
});