import { fetchTransaction } from '@/services/payments'

const initialState = {
  transactions: [],
  meta: []
}

export default {
  state: initialState,
  getters: {
    getTransactions: (state) => state.transactions,
    getTransactionMeta: (state) => state.meta
  },
  mutations: {
    setInitialState(state) {
      state.transactions = []
      state.meta = []
    },
    setTransactions(state, payload) {
      state.transactions = payload.data
      state.meta = payload.meta
    }
  },
  actions: {
    async getTransactions({commit}, page) {
      await commit('setInitialState')

      if (!page) {
        page = 1
      }

      const response = await fetchTransaction(page)

      if (response.status === 200) {
        await commit('setTransactions', response.data)
      }
    }
  },
}
