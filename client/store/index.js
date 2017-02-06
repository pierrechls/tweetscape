import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  tweets: [],
  hashtag: null,
  isLoading: false
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
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
