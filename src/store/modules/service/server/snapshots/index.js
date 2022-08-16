import { fetchServerCreateSnapshot, fetchServerSnapshotRestore, fetchServerSnapshotDelete } from '@/services/service/server'

const initialState = {
  isServerSnapshotIsCreated: false,
  isRestoredSnapshot: false,
  restoreSnapshotErrors: []
}

export default {
  state: initialState,
  getters: {
    isServerSnapshotIsCreated: (state) => state.isServerSnapshotIsCreated
  },
  mutations: {
    setInitialState(state) {
      state.isServerSnapshotIsCreated = false
      state.isRestoredSnapshot = false
      state.restoreSnapshotErrors = []
    },
    setServerSnapshotIsCreated(state) {
      state.isServerSnapshotIsCreated = true
    },
    setServerSnapshotIsRestored(state) {
      state.isRestoredSnapshot = true
    },
    setServerSnapshotRestoreErrors(state, payload) {
      state.restoreSnapshotErrors = payload
    }
  },
  actions: {
    async createSnapshot({commit}, serverId) {
      commit('setInitialState')

      const response = await fetchServerCreateSnapshot(serverId)

      if (response.status === 201) {
        await commit('setServerSnapshotIsCreated')
      }
    },
    async restoreSnapshot({commit}, data) {
      commit('setInitialState')

      const response = await fetchServerSnapshotRestore(data)

      // if (response.status === 201) {
      //     await commit('setServerSnapshotIsRestored')
      // } else {
      //     await commit('setServerSnapshotRestoreErrors', response.data)
      // }
    },
    async deleteSnapshot({commit}, data) {
      await fetchServerSnapshotDelete(data)
    }
  },
}
