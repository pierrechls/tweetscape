import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import settings from 'lib/settings'

Vue.use(Vuex)

const state = {
  lang: settings.app.lang,
  tweets: [],
  hashtag: null,
  isLoading: false,
  granimGradients: []
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
  SET_IS_LOADING(state, loading) {
    state.isLoading = loading
  },
  FILTER_UNIQ_TWEETS(state) {
    state.tweets = _.uniqBy(state.tweets, 'id')
  },
  SORT_TWEETS_BY_DATE(state) {
    state.tweets = _.sortBy(state.tweets, (tweet) => { return new Date(tweet.created_at) })
  },
  ADD_GRANIM_GRADIENT(state, gradient) {
    state.granimGradients.push(gradient)
  }
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
  isLoading({commit}) {
    commit('SET_IS_LOADING', true)
  },
  isNotLoading({commit}) {
    commit('SET_IS_LOADING', false)
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
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
