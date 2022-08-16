import { fetchCustomerProfile, fetchCustomerPassword } from '@/services/profile'

const initialState = {
  isCustomerPasswordUpdated: false,
  customerPasswordErrors: {},
  isCustomerProfileUpdated: false,
  customerProfileErrors: {}
}

export default {
  state: initialState,
  getters: {
    isCustomerPasswordUpdated: (state) => state.isCustomerPasswordUpdated,
    customerPasswordErrors: (state) => state.customerPasswordErrors,
    isCustomerProfileUpdated: (state) => state.isCustomerProfileUpdated,
    customerProfileErrors: (state) => state.customerProfileErrors
  },
  mutations: {
    setInitialState(state) {
      state.isCustomerPasswordUpdated = false
      state.customerPasswordErrors = {}
      state.isCustomerProfileUpdated = false
      state.customerProfileErrors = {}
    },
    setCustomerPasswordIsUpdated(state) {
      state.customerPasswordErrors = {}
      state.isCustomerPasswordUpdated = true
    },
    setCustomerPasswordErrors(state, payload) {
      state.isCustomerPasswordUpdated = false
      state.customerPasswordErrors = payload
    },
    setCustomerProfileIsUpdated(state) {
      state.customerProfileErrors = {}
      state.isCustomerProfileUpdated = true
    },
    setCustomerProfileErrors(state, payload) {
      state.isCustomerProfileUpdated = false
      state.customerProfileErrors = payload
    }
  },
  actions: {
    async updateCustomerProfile({commit}, form) {
      const response = await fetchCustomerProfile(form)

      if (response.status === 204) {
        await commit('setCustomerProfileIsUpdated')
      } else {
        await commit('setCustomerProfileErrors', response.data)
      }
    },
    async updateCustomerPassword({commit}, form) {
      const response = await fetchCustomerPassword(form)

      if (response.status === 204) {
        await commit('setCustomerPasswordIsUpdated')
      } else {
        await commit('setCustomerPasswordErrors', response.data)
      }
    }
  },
}
