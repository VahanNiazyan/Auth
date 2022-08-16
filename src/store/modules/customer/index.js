import { fetchCustomer } from '@/services/customer'
import { setCustomer } from '@/configs/axios/token'

const initialState = {
  customer: []
}

export default {
  state: initialState,
  getters: {
    customer: (state) => state.customer,
  },
  mutations: {
    setInitialState(state) {
      state.customer = []
    },
    setCustomer(state, payload) {
      state.customer = payload.customer

      setCustomer(JSON.stringify(payload.customer))
    }
  },
  actions: {
    async getCustomer({commit}) {
      await commit('setInitialState')

      const response = await fetchCustomer()

      if (response.status === 200) {
        await commit('setCustomer', response.data)
      }
    }
  },
}
