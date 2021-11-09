/*!

 =========================================================
 * Vue Black Dashboard PRO - v1.3.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/vue-black-dashboard-pro
 * Copyright 2019 Creative Tim (https://www.creative-tim.com)

 * Coded by Creative Tim

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import RouterPrefetch from 'vue-router-prefetch'
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';

//added lei
import './util/validation'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import store from './store'
// router setup
import router from './routes/router';
import i18n from './i18n';
import './registerServiceWorker'
// plugin setup
Vue.use(DashboardPlugin);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);

Vue.config.productionTip = false //added lei

/* toast initial configuration */ //added lei
Vue.use(VueToast, {
  position: 'top',
  dimissible: 'true'
})
/* eslint-disable no-new */
new Vue({
 // el: '#app', disbaled lei
  render: h => h(App),
  router,
  i18n,
  store,//added lei
  render: (h) => h(App)//added lei
}).$mount('#app') //added lei
