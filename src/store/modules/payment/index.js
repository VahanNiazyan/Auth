import { fetchPayments, fetchPaymentStatus } from '@/services/payments'

const initialState = {
  paymentIntent: false,
  payments: [],
  paymentsErrors: false,
  paymentsErrorMessages: []
}

export default {
  state: initialState,
  getters: {
    payments: (state) => state.payments,
    paymentIntent: (state) => state.paymentIntent,
    paymentsErrors: (state) => state.paymentsErrors,
    paymentsErrorMessages: (state) => state.paymentsErrorMessages,
  },
  mutations: {
    setInitialState(state) {
      state.payments = []
      state.paymentsErrors = false
      state.paymentsErrorMessages = []
    },
    setUserPaymentsError(state, payload) {
      state.payments = []
      state.paymentsErrors = true
      state.paymentsErrorMessages = payload
    },
    setUserPayments(state, payload) {
      state.payments = payload.payment_methods
      state.paymentsErrors = false
      state.paymentsErrorMessages = []
    },
    setPaymentStatus(state, payload) {
      if (payload.response.completed) {
        const transactionIds = JSON.parse(localStorage.getItem('transactionsIds')) ?? []
        const index = transactionIds.indexOf(payload.transactionId)

        if (index !== -1) {
          transactionIds.splice(index, 1)

          localStorage.setItem('transactionsIds', JSON.stringify(transactionIds))

          if (!state.paymentIntent) {
            localStorage.setItem('transaction', 'true')
          }
        }
      }

      state.paymentIntent = payload.response.completed
    },
    checkTransactionId(state, transactionId) {
      const transactionIds = JSON.parse(localStorage.getItem('transactionsIds')) ?? []

      if (transactionIds.indexOf(transactionId) === -1) {
        localStorage.setItem('transactionsIds', JSON.stringify(transactionIds.concat(transactionId)))
      }
    }
  },
  actions: {
    async getPayments({commit}) {
      await commit('setInitialState')

      const response = await fetchPayments()

      if (response.status === 200) {
        await commit('setUserPayments', response.data)
      } else {
        commit('setUserPaymentsError', response.data)
      }
    },
    async checkPaymentStatus({commit}, transactionId) {
      commit('checkTransactionId', transactionId)

      const response = await fetchPaymentStatus(transactionId)

      if (response.status === 200) {
        await commit('setPaymentStatus', { response: response.data, transactionId: transactionId })
      } else {
        commit('setUserPaymentsError', response.data)
      }
    }
  },
}
