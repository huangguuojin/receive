import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    user: null
  },
  getters: {
    getUser: function (state) {
      if (!state.user) {
        state.user = JSON.parse(localStorage.getItem('user'))
      }
      return state.user
    }
  },
  mutations: {
    changeLogin (state, user) {
      state.Authorization = user.Authorization
      localStorage.setItem('Authorization', user.Authorization)
    },
    delToken (state) {
      state.Authorization = ''
      localStorage.removeItem('Authorization')
    },
    setUser: function (state, value) {
      state.user = value
      localStorage.setItem('user', JSON.stringify(value))
    },
    removeUser: function (state) {
      state.user = null
      localStorage.removeItem('user')
    }
  }
})
export default store
