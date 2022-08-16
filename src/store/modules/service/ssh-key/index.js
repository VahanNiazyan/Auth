import { fetchSshKeys, fetchCreateSshKey, fetchDeleteSshKey } from '@/services/service/ssh-key'

const initialState = {
  sshKey: {},
  sshKeys: [],
  sshKeyErrors: false,
  sshKeysErrors: false,
  sshKeyErrorMessages: [],
  sshKeysErrorMessages: []
}

export default {
  state: initialState,
  getters: {
    sshKey: (state) => state.sshKey,
    sshKeys: (state) => state.sshKeys,
    sshKeysErrors: (state) => state.sshKeysErrors,
    sshKeysErrorMessages: (state) => state.sshKeysErrorMessages,
    sshKeyErrorMessages: (state) => state.sshKeyErrorMessages,
  },
  mutations: {
    setInitialState(state) {
      state.sshKeys = []
      state.sshKeysErrors = false
      state.sshKeysErrorMessages = []
    },
    setUserSshKeysError(state, payload) {
      state.sshKeys = []
      state.sshKeysErrors = true
      state.sshKeysErrorMessages = payload
    },
    setUserSshKeys(state, payload) {
      state.sshKeys = payload.keys
      state.sshKeysErrors = false
      state.sshKeysErrorMessages = []
    },
    setUserSshKeyError(state, payload) {
      state.sshKey = []
      state.sshKeyErrors = true
      state.sshKeyErrorMessages = payload
    },
    setUserSshKey(state, payload) {
      state.sshKey = payload.key
      state.sshKeyError = false
      state.sshKeyErrorMessages = []
    }
  },
  actions: {
    async getSshKeys({commit}) {
      await commit('setInitialState')

      const response = await fetchSshKeys()

      if (response.status === 200) {
        await commit('setUserSshKeys', response.data)
      } else {
        commit('setUserSshKeysError', response.data)
      }
    },
    async createSshKey({commit}, data) {
      const response = await fetchCreateSshKey(data)

      if (response.status === 200) {
        await commit('setUserSshKey', response.data)
      } else {
        commit('setUserSshKeyError', response.data)
      }
    },
    async deleteSshKey({commit, state}, sshKeyId) {
      await fetchDeleteSshKey(sshKeyId)

      state.sshKeys = state.sshKeys.filter((key) => {
        return key.uuid !== sshKeyId
      })
    }
  },
}
