import { fetchServerSettings } from '@/services/service/server'

const initialState = {
  isSavedSettings: false,
  settingsError: []
}

export default {
  state: initialState,
  getters: {
    isSavedSettings: (state) => state.isSavedSettings,
    settingsError: (state) => state.settingsError
  },
  mutations: {
    setInitialState(state) {
      state.isSavedSettings = false
      state.settingsError = []
    },
    setSettingsSuccess(state) {
      state.isSavedSettings = true
    },
    setSettingsError(state, payload) {
      state.settingsError = payload
    }
  },
  actions: {
    async serverSettings({commit}, form) {
      const response = await fetchServerSettings(form)

      if (response.status === 200) {
        await commit('setSettingsSuccess')
      } else {
        await commit('setSettingsError', response.data)
      }
    }
  },
}
