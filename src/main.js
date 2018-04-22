import Vue from 'vue'
import App from './App'
import routes from 'router'
import VueRouter from 'vue-router'
import Toast from 'base/toast';
import axiosPlugin from 'common/js/https'
import 'common/scss/index.scss'
import store from 'store'
import { setWechatTitle } from 'utils'
import FastClick from 'fastclick'
import 'vue-ydui/dist/ydui.rem.css';
import 'vue-ydui/dist/ydui.base.css'


FastClick.attach(document.body);
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Toast)
Vue.use(axiosPlugin);

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //路由发生变化修改页面title
  if (to.meta && to.meta.title) {
    setWechatTitle(to.meta.title,'');
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
