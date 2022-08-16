import { fetchTicket, closeTicket, createTicket, rateTicket } from '@/services/support/tickets/ticket'

const initialState = {
  ticket: null,
  createdTicket: null,
  ticketErrors: false,
  ticketErrorMessages: [],
  ticketCreateSuccess: false,
  ticketCreateError: false,
  ticketCreateErrorMessage: []
}

export default {
  state: initialState,
  getters: {
    ticket: (state) => state.ticket,
    ticketErrors: (state) => state.ticketErrors,
    ticketErrorMessages: (state) => state.ticketErrorMessages,
    createdTicket: (state) => state.createdTicket,
    ticketCreateError: (state) => state.ticketCreateError,
    ticketCreateErrorMessage: (state) => state.ticketCreateErrorMessage
  },
  mutations: {
    setInitialState(state) {
      state.ticket = null
      state.ticketsError = false
      state.ticketsErrorMessage = []
    },
    async setTicketSuccess(state) {
      state.ticketsSuccess = true
      state.ticketsError = false
    },
    setTicketError(state, payload) {
      state.ticketsSuccess = false
      state.ticketsError = true
      state.ticketsErrorMessage = payload
    },
    setTicketCreateError(state, payload) {
      state.ticketCreateSuccess = false
      state.ticketCreateError = true
      state.ticketCreateErrorMessage = payload
    },
    setTicket(state, payload) {
      state.ticket = payload.ticket
    },
    setCreatedTicket(state, payload) {
      state.createdTicket = payload.ticket
    }
  },
  actions: {
    async getTicket({commit}, ticketId) {
      await commit('setInitialState')

      const response = await fetchTicket(ticketId)

      if (response.status === 200) {
        await commit('setTicket', response.data)
      } else {
        commit('setTicketsError', response.data)
      }
    },
    async rateTicket({commit}, data) {
      await rateTicket(data.ticketId, data.form)
    },
    async createTicket({commit}, data) {
      const response = await createTicket(data)

      if (response.status === 201) {
        await commit('setCreatedTicket', response.data)
      } else if(response.status === 429) {
        const error = {
          errors: {
            message: [],
            codeManyRequest: 'tickets.messageCreationRateLimit'
          }
        }

        commit('setTicketCreateError', error)
      } else {
        commit('setTicketCreateError', response.data)
      }
    },
    async closeTicket({commit}, data) {
      const response = await closeTicket(data.status, data.ticketId)

      if (response.status === 200) {
        await commit('setTicketsSuccess', response.data)
      } else {
        commit('setTicketsError', response.data)
      }
    }
  },
}
