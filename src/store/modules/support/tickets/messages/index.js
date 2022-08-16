import { sendMessage } from '@/services/support/tickets/messages'

const initialState = {
  msg: null,
  msgSuccess: false,
  msgError: false,
  msgErrorMessage: {},
}

export default {
  state: initialState,
  getters: {
    getMessage: (state) => state.msg,
    getMessageErrors: (state) => state.msgErrorMessage
  },
  mutations: {
    setInitialState(state) {
      state.msg = null
      state.msgSuccess = false
      state.msgError = false
      state.msgErrorMessage = []
    },
    async setMessagesSuccess(state, payload) {
      state.msgSuccess = true
      state.msg = payload.message
    },
    setMessagesError(state, payload) {
      state.msgError = true
      state.msgErrorMessage = payload
    },
  },
  actions: {
    async sendMessage({commit}, data) {
      const response = await sendMessage(data.form, data.ticketId)

      if (response.status === 201) {
        await commit('setMessagesSuccess', response.data)
      } else if(response.status === 429) {
        const error = {
          errors: {
            message: [],
            codeManyRequest: 'tickets.messageCreationRateLimit'
          }
        }

        commit('setMessagesError', error)
      } else {
        commit('setMessagesError', response.data)
      }
    },
  },
}
