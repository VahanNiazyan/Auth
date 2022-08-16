import { fetchAbuseCases, fetchAbuseCase, submitAbuseStatement } from '@/services/support/abuse'

/**
 *
 * @type {AbuseInitialState}
 */
const initialState = {
  abuseCase: {},
  abuseCases: [],
  abuseSuccess: false,
  abuseStatementSuccess: false,
  abuseError: false,
  abuseErrorMessage: []
}

export default {
  state: initialState,
  getters: {
    getAbuseCase: (state) => state.abuseCase,
    getAbuseCases: (state) => state.abuseCases,
    abuseStatementSuccess: (state) => state.abuseStatementSuccess,
    abuseErrorMessage: (state) => state.abuseErrorMessage
  },
  mutations: {
    setInitialState(state) {
      state.abuseCase = {}
      state.abuseCases = []
      state.abuseStatementSuccess = false
      state.abuseSuccess = false
      state.abuseError = false
      state.abuseErrorMessage = []
    },
    setAbuseCase(state, payload) {
      state.abuseCase = payload.abuse_case
    },
    setAbuseStatement(state, payload) {
      state.abuseStatementSuccess = payload.abuse_case
    },
    setAbuseSuccess(state, payload) {
      state.abuseSuccess = true
      state.abuseError = false
      state.abuseCases = payload.abuse_cases
    },
    setAbuseError(state, payload) {
      state.abuseSuccess = false
      state.abuseError = true
      state.abuseErrorMessage = payload
    }
  },
  actions: {
    async getAbuse({commit}, form) {
      await commit('setInitialState')

      const response = await fetchAbuseCases(form)

      if (response.status === 200) {
        await commit('setAbuseSuccess', response.data)
      } else {
        commit('setAbuseError', response.data)
      }
    },
    async getAbuseCase({commit}, abuseId) {
      await commit('setInitialState')

      const response = await fetchAbuseCase(abuseId)

      if (response.status === 200) {
        await commit('setAbuseCase', response.data)
      } else {
        commit('setAbuseError', response.data)
      }
    },
    async submitAbuseStatement({commit, dispatch}, data) {
      const response = await submitAbuseStatement(data.form, data.abuseId)

      if (response.status === 201) {
        await commit('setAbuseStatement', response.data)
      } else {
        commit('setAbuseError', response.data)
      }
    }
  },
}
