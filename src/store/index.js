import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import schedule from './schedule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    schedule
  }
})
