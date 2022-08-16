import { fetchServerTab } from '@/services/service/server'

const initialState = {
  vncUrl: ''
}

export default {
  state: initialState,
  getters: {
    vncUrl: (state) => state.vncUrl
  },
  mutations: {
    setInitialState(state) {
      state.vncUrl = ''
    },
    setVncUrl(state, payload) {
      state.vncUrl = payload.vnc_url
    }
  },
  actions: {
    async getServerVnc({commit}, form) {
      const response = await fetchServerTab(form)

      if (response.status === 200) {
        await commit('setVncUrl', response.data)
      }
    }
  },
}
