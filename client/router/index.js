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
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'hashtag',
      path: '/hashtag',
      component: Hashtag
    },
    {
      name: 'timeline',
      path: '/timeline',
      component: Timeline
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
