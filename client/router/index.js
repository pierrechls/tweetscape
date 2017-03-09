import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Hashtag from '../views/Hashtag'
import Timeline from '../views/Timeline'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/hashtag',
      component: Hashtag
    },
    {
      path: '/timeline',
      component: Timeline
    }
  ]
})
