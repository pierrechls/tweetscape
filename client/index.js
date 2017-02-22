import Vue from 'vue'
import App from 'components/App'
import settings from 'lib/settings'

// Global vue stuffs
import 'gsap'
import 'locales/index'

// Routing
import router from 'client/router'

// Store
import store from 'client/store'

// add vue-resource to Vue
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = `${settings.API.url}:${settings.API.port}`

// sync store with router
import { sync } from 'vuex-router-sync'
sync(store, router)

import 'aframe-gridhelper-component'

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})
