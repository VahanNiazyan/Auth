import {
  fetchServerFlavor,
  fetchServerFlavorUpgrade,
  fetchServerFlavorCalculation,
  fetchServerUpgrades
} from '@/services/service/server'

const initialState = {
  upgrades: [],
  isUpgrade: false,
  flavors: [],
  calculation: {}
}

export default {
  state: initialState,
  getters: {
    upgrades: (state) => state.upgrades,
    isUpgrade: (state) => state.isUpgrade,
    flavors: (state) => state.flavors,
    calculation: (state) => state.calculation
  },
  mutations: {
    setInitialFlavor(state) {
      state.flavors = []
    },
    setFlavors(state, payload) {
      state.flavors = payload.flavors
    },
    setFlavorsCalculation(state, payload) {
      state.calculation = payload
    },
    setUpgrades(state, payload) {
      state.upgrades = payload.upgrades
    },
    setIsUpgrade(state, payload) {
      state.isUpgrade = payload
    }
  },
  actions: {
    async getServerUpgrades({commit}, serverId) {
      const response = await fetchServerUpgrades(serverId)

      if (response.status === 200) {
        await commit('setUpgrades', response.data)
      }
    },
    async setServerUpgrade({commit}, serverId) {
      const response = await fetchServerFlavorUpgrade(serverId)

      if (response.status === 200) {
        commit('setIsUpgrade', true)
      } else {
        commit('setIsUpgrade', response.data)
      }
    },
    async getServerFlavors({commit}, serverId) {
      const response = await fetchServerFlavor(serverId)

      if (response.status === 200) {
        await commit('setFlavors', response.data)
      }
    },
    async getServerFlavorsCalculation({commit}, serverId) {
      commit('setInitialFlavor')

      const response = await fetchServerFlavorCalculation(serverId)

      if (response.status === 200) {
        await commit('setFlavors', response.data)
      }
    }
  },
}
