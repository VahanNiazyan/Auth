import { fetchPasswordForget } from '@/services/auth/forgot-password'

const initialState = {
  forgotPasswordSuccess: false,
  forgotPasswordError: false,
  forgotPasswordMessage: []
}

export default {
  state: initialState,
  getters: {
    forgotPasswordSuccess: state => state.forgotPasswordSuccess,
    forgotPasswordMessage: state => state.forgotPasswordMessage,
    forgotPasswordError: state => state.forgotPasswordError
  },
  mutations:{
    setInitialState(state) {
      state.forgotPasswordError = false
      state.forgotPasswordSuccess = false
      state.forgotPasswordMessage = []
    },
    setSuccess(state, payload) {
      state.forgotPasswordSuccess = true
      state.forgotPasswordError = false
      state.forgotPasswordMessage = payload
    },
    setError(state, payload) {
      state.forgotPasswordError = true
      state.forgotPasswordMessage = payload
    }
  },
  actions: {
    async forgotPassword({ commit }, form) {
      commit('setInitialState')

      const response = await fetchPasswordForget(form)

      if (response.status === 200 && response.data.message.indexOf('password reset') > -1) {
        commit('setSuccess', response.data)
      } else {
        commit('setError', response.data)
      }
    }
  }
}
