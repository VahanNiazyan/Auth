import {
  fetchServerCreateAdditionalDisk,
  fetchServerCancelAdditionalDisk,
  fetchServerDiskPrice,
  fetchServerStorageClasses
} from '@/services/service/server'

const initialState = {
  isCreated: false,
  createErrors: [],
  storageClasses: [],
  diskPricing: {},
  diskPricingError: [],
  isCancelledAdditionalDisk: false
}

export default {
  state: initialState,
  getters: {
    isDiskCreated: (state) => state.isCreated,
    diskCreateErrors: (state) => state.createErrors,
    storageClasses: (state) => state.storageClasses,
    diskPricing: (state) => state.diskPricing,
    diskPricingError: (state) => state.diskPricingError,
    isCancelledAdditionalDisk: (state) => state.isCancelledAdditionalDisk
  },
  mutations: {
    setInitialState(state) {
      state.isCreated = false
      state.createErrors = []
      state.diskPricing = {}
      state.diskPricingError = []
      state.isCancelledAdditionalDisk = false
    },
    setAdditionalDiskIsCancelled(state) {
      state.isCancelledAdditionalDisk = true
    },
    setDiskPrice(state, payload) {
      state.diskPricing = payload.pricing
    },
    setDiskPriceError(state, payload) {
      state.diskPricingError = payload
    },
    setStorageClasses(state, payload) {
      state.storageClasses = payload.storage_classes
    },
    setCreatedDisk(state) {
      state.isCreated = true
    },
    setCreatedDiskError(state, payload) {
      state.createErrors = payload
    }
  },
  actions: {
    async createAdditionalDisk({commit}, form) {
      commit('setInitialState')

      const response = await fetchServerCreateAdditionalDisk(form)

      if (response.status === 201) {
        commit('setCreatedDisk')
      } else {
        commit('setCreatedDiskError', response.data)
      }
    },
    async cancelAdditionalDisk({commit}, form) {
      commit('setInitialState')

      const response = await fetchServerCancelAdditionalDisk(form)

      if (response.status === 204) {
        commit('setAdditionalDiskIsCancelled')
      }
    },
    async calculateDiskPrice({commit}, form) {
      const response = await fetchServerDiskPrice(form)

      if (response.status === 200) {
        commit('setDiskPrice', response.data)
      } else {
        commit('setDiskPriceError', response.data)
      }
    },
    async getStorageClasses({commit}, serverId) {
      const response = await fetchServerStorageClasses(serverId)

      if (response.status === 200) {
        commit('setStorageClasses', response.data)
      }
    }
  },
}
