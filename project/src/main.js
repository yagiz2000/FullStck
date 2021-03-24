import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import {routes} from "./routes";
Vue.use(VueRouter);
const router = new VueRouter({
  routes: routes // key ile value birbirine eşitse sadece routes diyip bırakabilirdin.
});
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router:router,
}).$mount('#app')
