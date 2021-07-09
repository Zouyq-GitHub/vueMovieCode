// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axios from 'axios';
import qs from 'qs';
import Vuex from 'vuex';
import store from './store/store';

// import $ from 'jquery';
// import Cookies from "js-cookie";

Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(router);
Vue.use(ViewUI);
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
// Vue.prototype.$ = $
// Vue.prototype.Cookies = Cookies;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
