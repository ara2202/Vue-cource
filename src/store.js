import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    value: 'someValue'
  },
  getters: {
    titleCount: state => state.value.length
  },
  mutations: {
    changeValue: (state, payload) => (state.value = payload)
  },
  actions: {}
})

export default store
