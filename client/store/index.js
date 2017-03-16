import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import settings from 'lib/settings'

Vue.use(Vuex)

const state = {
  lang: settings.app.lang,
  tweets: [],
  max_id: '',
  hashtag: null,
  gradients: [],
  showPreloader: false,
  showEndMessage: false
}

const mutations = {
  ADD_TWEET(state, tweet) {
    state.tweets.push(tweet)
  },
  REMOVE_FIRST_TWEET(state) {
    state.tweets.shift()
  },
  SET_HASHTAG(state, hashtag) {
    state.hashtag = hashtag
  },
  FILTER_UNIQ_TWEETS(state) {
    state.tweets = _.uniqBy(state.tweets, 'id')
  },
  SORT_TWEETS_BY_DATE(state) {
    state.tweets = _.sortBy(state.tweets, (tweet) => { return new Date(tweet.created_at) })
  },
  ADD_GRANIM_GRADIENT(state, gradient) {
    state.gradients.push(gradient)
  },
  SET_TWEETS_MAX_ID(state, maxId) {
    state.max_id = maxId
  },
  SHOW_END_MESSAGE(state, show) {
    state.showEndMessage = show
  },
  RESET_TWEETS(state) {
    state.tweets = []
  },
  SHOW_PRELOADER(state, show) {
    state.showPreloader = show
  },
}

const actions = {
  addTweet({commit}, tweet) {
    commit('ADD_TWEET', tweet)
  },
  removeFirstTweet({commit}) {
    commit('REMOVE_FIRST_TWEET')
  },
  setHashtag({commit}, hashtag) {
    commit('SET_HASHTAG', hashtag)
  },
  filterUniqTweets({commit}) {
    commit('FILTER_UNIQ_TWEETS')
  },
  sortTweetsByDate({commit}) {
    commit('SORT_TWEETS_BY_DATE')
  },
  updateTweets({commit}) {
    commit('FILTER_UNIQ_TWEETS')
    commit('SORT_TWEETS_BY_DATE')
  },
  addGranimGradient({commit}, gradient) {
    commit('ADD_GRANIM_GRADIENT', gradient)
  },
  setTweetsMaxId({commit}, maxId) {
    commit('SET_TWEETS_MAX_ID', maxId)
  },
  resetTweets({commit}) {
    commit('RESET_TWEETS')
  },
  showEndMessage({commit}, show) {
    commit('SHOW_END_MESSAGE', show)
  },
  resetAfterExperiment({commit}) {
    commit('SET_HASHTAG', null)
    commit('RESET_TWEETS'),
    commit('SET_TWEETS_MAX_ID', '')
  },
  showPreloader({commit}, show) {
    commit('SHOW_PRELOADER', show)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
