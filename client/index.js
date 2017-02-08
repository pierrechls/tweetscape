import Vue from 'vue'
import App from 'components/App'
import router from './router'
import store from './store'
import settings from 'settings/default'

// add vue-resource to Vue
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = `${settings.API.url}:${settings.API.port}`

// sync store with router
import { sync } from 'vuex-router-sync'
sync(store, router)

import 'gsap'
import 'aframe'
import 'aframe-canvas'
import 'aframe-gridhelper-component'

const app = new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})
