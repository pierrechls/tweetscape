import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  tweets: [],
  hashtag: null
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
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
