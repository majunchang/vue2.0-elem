// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
// 引入vue-resource
import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.config.productionTip = false

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router
})

 router.push('/goods');
export default app;
