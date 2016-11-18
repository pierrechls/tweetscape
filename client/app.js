import Vue from 'vue'
import App from 'components/App'
import router from './router'
import store from './store'


// sync store with router
import { sync } from 'vuex-router-sync'
sync(store, router)

import 'gsap'
import 'aframe'
import 'aframe-gridhelper-component'

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
