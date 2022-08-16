import {
  fetchServers,
  fetchServer,
  fetchServerRegions,
  fetchServerCreate,
  fetchServerAction,
  fetchServerExtend,
  fetchServerTab,
  fetchServerMeta
} from '@/services/service/server'
import router from '@/router'
import { ServerStatusEnum } from '@/enums'


const initialState = {
  ServerStatusEnum: ServerStatusEnum,
  isExpired: false,
  isLocked: false,
  runtimes: [],
  regions: [],
  server: {},
  servers: [],
  meta: [],
  isServerNameUpdated: false,
  serverNameErrors: [],
  serverErrors: false,
  serverErrorMessages: [],
  serverCreated: {},
  serverCreateErrorMessages: []
}

export default {
  state: initialState,
  getters: {
    isExpired: (state) => state.isExpired,
    isLocked: (state) => state.isLocked,
    server: (state) => state.server,
    getServers: (state) => state.servers,
    getServerMeta: (state) => state.meta,
    runtimes: (state) => state.runtimes,
    regions: (state) => state.regions,
    serverErrors: (state) => state.serverErrors,
    serverErrorMessages: (state) => state.serverErrorMessages,
    serverCreated: (state) => state.serverCreated,
    serverCreateErrorMessages: (state) => state.serverCreateErrorMessages,
    isServerNameUpdated: (state) => state.isServerNameUpdated,
    serverNameErrors: (state) => state.serverNameErrors
  },
  mutations: {
    setInitialState(state) {
      state.servers = []
      state.serverErrors = false
      state.serverErrorMessages = []
    },
    setInitialStateServerName(state) {
      state.isServerNameUpdated = false
    },
    setUserServerError(state, payload) {
      state.serverErrors = true
      state.serverErrorMessages = payload
    },
    setUserServers(state, payload) {
      state.servers = payload.data
      state.server = {}
      state.isLocked = false
      state.meta = payload.meta
      state.serverErrors = false
      state.serverErrorMessages = []
    },
    setUserServer(state, payload) {
      state.server = payload.server

      if (state.server.task_lock !== null || state.server.status !== state.ServerStatusEnum.INSTALL_STATUS_DONE) {
        state.isLocked = true
      } else {
        state.isLocked = false
      }

      if (new Date(state.server.extended_until) <= new Date()) {
        state.isExpired = true
      } else {
        state.isExpired = false
      }
    },
    setUserServerRegions(state, payload) {
      state.regions = payload.regions
      state.runtimes = payload.runtimes
    },
    setServerCreated(state, payload) {
      state.serverCreateErrorMessages = []
      state.serverCreated = payload
    },
    setCreateServerErrorMessages(state, payload) {
      state.serverCreateErrorMessages = payload
      state.serverCreated = false
    },
    setCreateServerEmpty(state) {
      state.serverCreated = false
    },
    setServerActionError(state, payload) {
      state.serverErrorMessages = payload
    },
    setRuntimes(state, payload) {
      state.runtimes = payload.runtimes
    },
    setIsServerNameUpdated(state, payload) {
      state.isServerNameUpdated = true
      state.server = payload.server
    },
    setServerNameErrors(state, payload) {
      state.serverNameErrors = payload
    },
    setLocked(state) {
      state.isLocked = true
    }
  },
  actions: {
    async getServers({commit}, data) {
      // await commit('setInitialState')

      if (!data.page) {
        data.page = 1
      }

      if (!data.query) {
        data.query = ''
      }

      const response = await fetchServers(data)

      if (response.status === 200) {
        await commit('setUserServers', response.data)
      } else {
        commit('setUserServerError', response.data)
      }
    },
    async getServer({commit, dispatch}, serverId) {
      const response = await fetchServer(serverId)

      if (response.status === 200) {
        await commit('setUserServer', response.data)

        dispatch('getAccountBalance')
      } else {
        router.push('/service/server')
      }
    },
    async getServerRuntimes({commit}, form) {
      const response = await fetchServerTab(form)

      if (response.status === 200) {
        await commit('setRuntimes', response.data)
      }
    },
    async getServerRegions({commit}) {
      const response = await fetchServerRegions()

      if (response.status === 200) {
        await commit('setUserServerRegions', response.data)
      }
    },
    async createServer({commit}, form) {
      const response = await fetchServerCreate(form)

      if (response.status === 200) {
        await commit('setServerCreated', response.data)
      } else {
        await commit('setCreateServerErrorMessages', response.data)
      }
    },
    async setCreatedServerEmpty({commit}) {
      await commit('setCreateServerEmpty')
    },
    async serverAction({commit, dispatch}, form) {
      commit('setLocked')

      const response = await fetchServerAction(form)

      if (response.status === 200) {
        dispatch('getServer', form.serverId)
      } else {
        await commit('setServerActionError', response.data)
      }
    },
    async serverExtend({commit}, form) {
      const response = await fetchServerExtend(form)

      if (response.status === 200) {
        // await commit('setServerCreated', response.data)
      } else {
        await commit('setServerActionError', response.data)
      }
    },
    async updateServerMeta({commit}, data) {
      commit('setInitialStateServerName')

      const response = await fetchServerMeta(data)

      if (response.status === 200) {
        await commit('setIsServerNameUpdated', response.data)
      } else {
        await commit('setServerNameErrors', response.data)
      }
    }
  },
}
