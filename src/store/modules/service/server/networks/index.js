import { fetchRequestRDNS } from '@/services/service/server'
import {
  fetchServerPrivateNetwork,
  fetchDeleteServerPrivateNetwork,
  fetchPrivateNetworkRegion,
  fetchCreatePrivateNetwork,
  fetchAvailablePools,
  fetchCreatePort
} from '@/services/service/private-network'

const initialState = {
  meta: [],
  availablePools: [],
  isCreatedPort: false,
  createPortErrors: [],
  privateNetworks: [],
  privateNetworkIsDeleted: false,
  privateNetworkCreated: false,
  privateNetworkCreateErrorMessages: [],
  privateNetworkErrors: [],
  requestRDNSSuccess: false,
  requestRDNSError: [],
  regions: []
}

export default {
  state: initialState,
  getters: {
    availablePools: (state) => state.availablePools,
    isCreatedPort: (state) => state.isCreatedPort,
    createPortErrors: (state) => state.createPortErrors,
    requestRDNSSuccess: (state) => state.requestRDNSSuccess,
    requestRDNSError: (state) => state.requestRDNSError,
    getNetworkMeta: (state) => state.meta,
    privateNetworkRegions: (state) => state.regions,
    privateNetworkCreated: (state) => state.privateNetworkCreated,
    privateNetworkCreateErrorMessages: (state) => state.privateNetworkCreateErrorMessages,
    privateNetworks: (state) => state.privateNetworks,
    privateNetworkErrors: (state) => state.privateNetworkErrors,
    privateNetworkIsDeleted: (state) => state.privateNetworkIsDeleted
  },
  mutations: {
    setInitialState(state) {
      state.privateNetworks = []
      state.privateNetworkIsDeleted = false
      state.requestRDNSSuccess = false
      state.requestRDNSError = []
    },
    setRequestRDNSSuccess(state) {
      state.requestRDNSSuccess = true
    },
    setRequestRDNSError(state, payload) {
      state.requestRDNSError = payload
    },
    setPrivateNetworks(state, payload) {
      state.privateNetworks = payload.data
      state.meta = payload.meta
    },
    setPrivateNetworkIsDeleted(state) {
      state.privateNetworkIsDeleted = true
    },
    setPrivateNetworkErrors(state, payload) {
      state.privateNetworkErrors = payload
    },
    setPrivateNetworkRegions(state, payload) {
      state.regions = payload.data
    },
    setPrivateNetworkCreated(state) {
      state.privateNetworkCreated = true
    },
    setPrivateNetworkCreateErrorMessages(state, payload) {
      state.privateNetworkCreateErrorMessages = payload
    },
    setAvailablePools(state, payload) {
      state.availablePools = payload.data
    },
    setCreatedPort(state) {
      state.isCreatedPort = true
    },
    setCreatePortErrors(state, payload) {
      state.createPortErrors = payload
    }
  },
  actions: {
    async serverNetworkRequestRDNS({commit}, form) {
      commit('setInitialState')

      const response = await fetchRequestRDNS(form)

      if (response.status === 200) {
        await commit('setRequestRDNSSuccess')
      } else {
        await commit('setRequestRDNSError', response.data)
      }
    },
    async serverPrivateNetworks({commit}, data) {
      commit('setInitialState')

      if (!data.page) {
        data.page = 1
      }

      const response = await fetchServerPrivateNetwork(data)

      if (response.status === 200) {
        await commit('setPrivateNetworks', response.data)
      }
    },
    async deleteServerPrivateNetwork({commit}, networkId) {
      const response = await fetchDeleteServerPrivateNetwork(networkId)

      if (response.status === 204) {
        await commit('setPrivateNetworkIsDeleted')
      } else {
        await commit('setPrivateNetworkErrors', response.data)
      }
    },
    async getPrivateNetworkRegions({commit}) {
      const response = await fetchPrivateNetworkRegion()

      if (response.status === 200) {
        await commit('setPrivateNetworkRegions', response.data)
      }
    },
    async createPrivateNetwork({commit}, form) {
      const response = await fetchCreatePrivateNetwork(form)

      if (response.status === 200) {
        commit('setPrivateNetworkCreated')
      } else {
        commit('setPrivateNetworkCreateErrorMessages', response.data)
      }
    },
    async getAvailablePools({commit}, serverId) {
      const response = await fetchAvailablePools(serverId)

      if (response.status === 200) {
        commit('setAvailablePools', response.data)
      }
    },
    async createPort({commit}, form) {
      const response = await fetchCreatePort(form)

      if (response.status === 200) {
        commit('setCreatedPort')
      } else {
        commit('setCreatePortErrors', response.data)
      }
    }
  },
}
