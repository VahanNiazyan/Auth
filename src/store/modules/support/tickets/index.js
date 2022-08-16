import { fetchTickets } from '@/services/support/tickets'

/**
 *
 * @type {TicketsInitialState}
 */
const initialState = {
    tickets: [],
    ticketsOpenCount: 0,
    ticketsClosedCount: 0,
    isRateRating: false,
    ticketsSuccess: false,
    ticketsError: false,
    ticketsErrorMessage: []
}

export default {
    state: initialState,
    getters: {
        tickets: (state) => state.tickets,
        ticketsOpenCount: (state) => state.ticketsOpenCount,
        ticketsClosedCount: (state) => state.ticketsClosedCount,
        isLoading: (state) => state.isLoading,
        isRateRating: (state) => state.isRateRating,
        ticketsResponseMessage: (state) => state.ticketsErrorMessage,
        ticketsError: (state) => state.ticketsError
    },
    mutations: {
        setInitialState(state) {
            state.ticketsSuccess = false
            state.ticketsError = false
            state.ticketsErrorMessage = []
        },
        async setTicketsSuccess(state, payload) {
            state.ticketsSuccess = true
            state.ticketsError = false
        },
        setTicketsError(state, payload) {
            state.ticketsSuccess = false
            state.ticketsError = true
            state.ticketsErrorMessage = payload
        },
        setTickets(state, payload) {
            state.tickets = payload.tickets
            state.ticketsOpenCount = payload.tickets.length
        },
        setClosedTickets(state, payload) {
            state.tickets = state.tickets.concat(payload.tickets)
            state.ticketsClosedCount = payload.tickets.length
        }
    },
    actions: {
        async getTickets({commit}, filter) {
            const response = await fetchTickets(filter)

            if (response.status === 200) {
                if (filter) {
                    await commit('setClosedTickets', response.data)
                } else {
                    await commit('setTickets', response.data)
                }
            } else {
                commit('setTicketsError', response.data)
            }
        }
    },
}
