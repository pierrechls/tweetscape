import Vue from 'vue'
import Router from 'vue-router'
import Timeline from '../views/Timeline'
import Hashtag from '../views/Hashtag'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Hashtag
    },
    {
      path: '/timeline',
      component: Timeline
    }
  ]
})
