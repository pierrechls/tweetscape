import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from 'client/store'

Vue.use(VueI18n)
Vue.config.lang = store.state.lang

const locales = {
  fr: require('locales/fr'),
  en: require('locales/en')
}

Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

store.subscribe((mutation, state) => {
  Vue.config.lang = state.lang
})
