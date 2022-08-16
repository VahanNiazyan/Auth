import { fetchUserRegistration } from '@/services/auth/registration'

const initialState = {
  userRegistrationSuccess: false,
  userRegistrationSuccessMessage: '',
  userRegistrationError: false,
  userRegistrationErrorMessage: []
}

export default {
  state: initialState,
  getters: {
    registrationMessage: state => state.userRegistrationSuccessMessage,
    registrationResponseMessage: state => state.userRegistrationErrorMessage,
    userRegistrationError: state => state.userRegistrationError
  },
  mutations:{
    setInitialState(state) {
      state.userRegistrationSuccess = false
      state.userRegistrationSuccessMessage = ''
      state.userRegistrationError = false
      state.userRegistrationErrorMessage = []
    },
    async setUserRegistrationSuccess(state,payload) {
      state.userRegistrationSuccess = true
      state.userRegistrationError = false
      state.userRegistrationSuccessMessage = payload.customer
    },
    setUserRegistrationError(state, payload) {
      state.userRegistrationSuccess = false
      state.userRegistrationSuccessMessage = ''
      state.userRegistrationError = true
      state.userRegistrationErrorMessage = payload
    }
  },
  actions: {
    async userRegistration({ commit }, form) {
      await commit('setInitialState')

      const response = await fetchUserRegistration(form)

      if (response.status === 200) {
        await commit('setUserRegistrationSuccess', response.data)
      } else {
        commit('setUserRegistrationError', response.data)
      }
    }
  }
}
