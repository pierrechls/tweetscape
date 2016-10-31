import Vue from 'vue'
import App from 'components/App'
import router from './router'
import store from './store'


// sync store with router
import { sync } from 'vuex-router-sync'
sync(store, router)

// import aframe
import 'aframe'

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
