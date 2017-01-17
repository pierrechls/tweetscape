import Vue from 'vue'
import App from 'components/App'
import router from './router'
import store from './store'

// add vue-resource to Vue
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://localhost:3000'

// sync store with router
import { sync } from 'vuex-router-sync'
sync(store, router)

import 'gsap'
import 'aframe'
import 'aframe-canvas'
import 'aframe-gridhelper-component'

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
