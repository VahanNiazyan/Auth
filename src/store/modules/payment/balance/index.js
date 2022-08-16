import {
  fetchVoucher,
  fetchBalanceNotification,
  chargeAccount,
  fetchBalance,
  fetchAvailablePaymentMethods
} from '@/services/payments/balance'

const initialState = {
  balance: {
    formatted: 0
  },
  voucherSuccess: false,
  voucherError: false,
  voucherErrorMessage: [],
  balanceNotificationSuccess: false,
  balanceNotificationError: false,
  balanceNotificationErrorMessage: [],
  accountChargeSuccess: [],
  accountChargeError: false,
  accountChargeErrorMessage: [],
  availablePaymentsMethods: []
}

export default {
  state: initialState,
  getters: {
    availablePaymentsMethods: (state) => state.availablePaymentsMethods,
    getBalance: (state) => state.balance,
    getVoucherSuccess: (state) => state.voucherSuccess,
    getVoucherErrorMessages: (state) => state.voucherErrorMessage,
    getBalanceNotificationSuccess: (state) => state.balanceNotificationSuccess,
    getBalanceNotificationErrorMessages: (state) => state.balanceNotificationErrorMessage,
    accountChargeSuccess: (state) => state.accountChargeSuccess,
    accountChargeErrorMessages: (state) => state.accountChargeErrorMessage
  },
  mutations: {
    setInitialState(state) {
      state.voucherSuccess = false
      state.voucherError = false
      state.voucherErrorMessage = []
      state.balanceNotificationSuccess = false
      state.balanceNotificationError = false
      state.balanceNotificationErrorMessage = []
      state.accountChargeSuccess = []
      state.accountChargeError = false
      state.accountChargeErrorMessage = []
    },
    setVoucherSuccess(state, payload) {
      state.voucherSuccess = true
      state.voucherError = false
      state.voucherErrorMessage = []
    },
    setBalanceNotificationSuccess(state, payload) {
      state.balanceNotificationSuccess = true
      state.balanceNotificationError = false
      state.balanceNotificationErrorMessage = []
    },
    setAccountChargeSuccess(state, payload) {
      state.accountChargeSuccess = payload
      state.accountChargeError = false
      state.accountChargeErrorMessage = []
    },
    setVoucherError(state, payload) {
      state.voucherSuccess = false
      state.voucherError = true
      state.voucherErrorMessage = payload.errors
    },
    setBalanceNotificationError(state, payload) {
      state.balanceNotificationSuccess = false
      state.balanceNotificationError = true
      state.balanceNotificationErrorMessage = payload.errors
    },
    setAccountChargeError(state, payload) {
      state.accountChargeSuccess = false
      state.accountChargeError = true
      state.accountChargeErrorMessage = payload.errors ?? { serverError: true }
    },
    setAccountBalance(state, payload) {
      state.balance = payload.balance
    },
    setAvailablePaymentMethods(state, payload) {
      state.availablePaymentsMethods = payload.payment_systems
    }
  },
  actions: {
    async submitVoucherCode({commit}, form) {
      await commit('setInitialState')

      const response = await fetchVoucher(form)

      if (response.status === 200) {
        await commit('setVoucherSuccess', response.data)
      } else if(response.status === 429) {
        const error = {
          errors: {
            codeManyRequest: 'You tried redeeming a voucher too often, please try again later'
          }
        }

        commit('setVoucherError', error)
      } else {
        commit('setVoucherError', response.data)
      }
    },
    async submitBalanceNotification({commit}, form) {
      await commit('setInitialState')
      const response = await fetchBalanceNotification(form)

      if (response.status === 200) {
        await commit('setBalanceNotificationSuccess', response.data)
      }else {
        commit('setBalanceNotificationError', response.data)
      }
    },
    async accountCharge({commit}, form) {
      const response = await chargeAccount(form)

      if (response.status === 200) {
        await commit('setAccountChargeSuccess', response.data)
      } else {
        commit('setAccountChargeError', response.data)
      }
    },
    async getAccountBalance({commit}) {
      const response = await fetchBalance()

      if (response.status === 200) {
        await commit('setAccountBalance', response.data)
      }
    },
    async getAvailablePaymentMethods({commit}) {
      const response = await fetchAvailablePaymentMethods()

      if (response.status === 200) {
        await commit('setAvailablePaymentMethods', response.data)
      }
    }
  },
}
