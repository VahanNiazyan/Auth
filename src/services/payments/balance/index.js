import { getInstance } from '@/configs/axios'

export const fetchVoucher = async (form) => {
  return await getInstance()
    .post('/api/customer/v1/payment/voucher', {...form})
    .catch(function (error) {
      return error.response
    })
}

export const fetchBalanceNotification = async (form) => {
  return await getInstance()
    .post('/api/customer/v1/payment/balance/notification-threshold', {...form})
    .catch(function (error) {
      return error.response
    })
}

export const chargeAccount = async (form) => {
  return await getInstance()
    .post('/api/customer/v1/payment/intent', {...form})
    .catch(function (error) {
      return error.response
    })
}

export const fetchBalance = async () => {
  return getInstance().get('/api/customer/v1/payment/balance')
    .catch(function (error) {
      return error.response
    })
}

export const fetchAvailablePaymentMethods = async () => {
  return getInstance().get('/api/customer/v1/payment/methods')
    .catch(function (error) {
      return error.response
    })
}
