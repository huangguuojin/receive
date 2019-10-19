// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import global_ from './config/Global'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/index'
import btnCreate from './components/button/Create'
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.prototype.GLOBAL = global_
axios.defaults.withCredentials = true
axios.defaults.headers.common['Authorization'] = store.state.Authorization
Vue.prototype.$axios = axios
/* eslint-disable no-new */
Vue.component('v-btn-create', btnCreate)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
axios.interceptors.request.use(config => {
  if (store.state.Authorization.length === 0) {
    config.headers.common['Authorization'] = store.state.Authorization
  }
  return config
}, error => {
  return Promise.reject(error)
})
// http response 拦截器
axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        this.$store.commit('del_token')
        router.replace({
          path: '/login',
          query: {redirect: router.currentRoute.fullPath}
        })
    }
  }
  return Promise.reject(error.response.data)
})
