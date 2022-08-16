import { fetchInvoice } from '@/services/payments'

const initialState = {
  invoices: [],
  meta: []
}

export default {
  state: initialState,
  getters: {
    getInvoices: (state) => state.invoices,
    getInvoiceMeta: (state) => state.meta
  },
  mutations: {
    setInitialState(state) {
      state.invoices = []
      state.meta = []
    },
    setInvoices(state, payload) {
      state.invoices = payload.data
      state.meta = payload.meta
    }
  },
  actions: {
    async getInvoices({commit}, page) {
      await commit('setInitialState')

      if (!page) {
        page = 1
      }

      const response = await fetchInvoice(page)

      if (response.status === 200) {
        await commit('setInvoices', response.data)
      }
    }
  },
}
