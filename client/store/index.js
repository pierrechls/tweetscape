import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0,
  tweets: [
  ],
  hashtag: null
}

const mutations = {
  INCREMENT(state) {
    state.count++
  },
  ADD_TWEET(state, tweet) {
    state.tweets.push(tweet)
  },
  SET_HASHTAG(state, hashtag) {
    state.hashtag = hashtag
  }
}

const actions = {
  incrementAsync({commit}) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 200)
  },
  addTweet({commit}, tweet) {
    commit('ADD_TWEET', tweet)
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
