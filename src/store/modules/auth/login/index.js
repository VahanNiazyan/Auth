import { fetchRefreshToken, fetchUserLogin } from '@/services/auth/login'
import { setCustomer, setAuthorizedUserRefreshTokenSuccess, unsetCustomer } from '@/configs/axios/token'

const initialState = {
  userLoginSuccess: false,
  userLoginError: false,
  userLoginErrorMessage: []
}

export default {
  state: initialState,
  getters: {
    userLoginSuccess: state => state.userLoginSuccess,
    loginResponseMessage: state => state.userLoginErrorMessage,
    userLoginError: state => state.userLoginError
  },
  mutations:{
    setInitialState(state) {
      state.userLoginSuccess = false
      state.userLoginError = false
      state.userLoginErrorMessage = []
    },
    async setUserLoginSuccess(state, payload) {
      state.userLoginSuccess = true
      state.userLoginError = false
      // await setAuthorizedUserCredentials(token, tokenExpiredDate, remember)
    },
    setUserLoginError(state, payload) {
      state.userLoginSuccess = false
      state.userLoginError = true
      state.userLoginErrorMessage = payload
    },
    async setUserRefreshTokenSuccess(state, { tokenExpiredDate, token, remember }) {
      await setAuthorizedUserRefreshTokenSuccess(token, tokenExpiredDate, remember)
    }
  },
  actions: {
    async userLogin({ commit }, form) {
      await commit('setInitialState')

      const response = await fetchUserLogin(form)

      if (response.status === 200) {
        await commit('setUserLoginSuccess', response.data)
        await setCustomer(JSON.stringify(response.data.customer))
      } else {
        commit('setUserLoginError', response.data)
      }
    },
    async userLogOut() {
      unsetCustomer()
      // await fetchUserLogOut().then(() => unsetCustomer())
    },
    async refreshToken({ commit }) {
      const response = await fetchRefreshToken()

      if (response.status === 200) {
        await commit('setUserRefreshTokenSuccess', response.data.data)
      } else {
        commit('setUserRefreshTokenError', response.data)
      }
    }
  }
}
