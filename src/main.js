import Vue from 'vue'
import App from './App'
import routes from 'router'
import VueRouter from 'vue-router'
import Toast from 'base/toast';
import axiosPlugin from 'common/js/https'
import VueLazyload from 'vue-lazyload'
import fastclick from 'fastclick'
import 'common/scss/index.scss'
import store from 'store'
import { setWechatTitle } from 'utils'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import vueFeedback from 'vue-feedback'
import 'swiper/dist/css/swiper.css'
import $ from 'jquery'


fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(VueRouter)
Vue.use(vueFeedback)
Vue.use(Toast)
Vue.use(axiosPlugin);
Vue.use(VueLazyload, {
  //loading: require('./common/image/default.png')
})

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
