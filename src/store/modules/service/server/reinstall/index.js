import { fetchServerImages, fetchReInstallServer } from '@/services/service/server'

const initialState = {
  images: [],
  isReInstalled: false,
  errors: []
}

export default {
  state: initialState,
  getters: {
    serverImages: (state) => state.images,
    isReInstalled: (state) => state.isReInstalled,
    reInstallErrrors: (state) => state.errors
  },
  mutations: {
    setInitialState(state) {
      state.serverImages = []
    },
    setServerImages(state, payload) {
      const groupBy = keys => array =>
        array.reduce((objectsByKeyValue, obj) => {
          const value = keys.map(key => obj[key]).join('-');
          objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
          return objectsByKeyValue;
        }, {})
      const groupByOS = groupBy(['os_type']);
      state.images = groupByOS(payload.images)
    },
    setSuccess(state) {
      state.isReInstalled = true
    },
    setEmptySuccess(state) {
      state.isReInstalled = false
    },
    setErrors(state, payload) {
      state.isReInstalled = false
      state.errors = payload
    }
  },
  actions: {
    async getServerImages({commit}, serverId) {
      commit('setInitialState')

      const response = await fetchServerImages(serverId)

      if (response.status === 200) {
        await commit('setServerImages', response.data)
      }
    },
    async reinstallServer({commit}, data) {
      const response = await fetchReInstallServer(data)

      if (response.status === 200) {
        await commit('setSuccess')
      } else {
        commit('setErrors', response.data)
      }
    },
    async setReInstallEmpty({commit}) {
      commit('setEmptySuccess')
    }
  }
}
