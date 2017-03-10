import Vue from 'vue'
import App from 'components/App'
import settings from 'lib/settings'

// Import favicon
import 'assets/favicon/favicon.png'

// Global vue stuffs
import 'gsap'
import 'locales/index'

// Routing
import router from 'client/router'

// Store
import store from 'client/store'

// Add vue-resource to Vue
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = `${settings.API.url}:${settings.API.port}`

// Sync store with router
import { sync } from 'vuex-router-sync'
sync(store, router)

// Import a-frame libraries
import 'aframe-gradient-sky'
import 'aframe-particle-system-component'
import 'aframe-gridhelper-component'

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})
