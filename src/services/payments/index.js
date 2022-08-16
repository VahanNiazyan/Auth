import { getInstance } from '@/configs/axios'

export const fetchPayments = async () => {
  return getInstance().get('/api/customer/v1/payment/methods')
    .catch(function (error) {
      return error.response
    })
}

export const fetchPaymentStatus = async (transactionId) => {
  return getInstance().get(`/api/customer/v1/payment/intent/${transactionId}/complete`)
    .catch(function (error) {
      return error.response
    })
}

export const fetchTransaction = async (page) => {
  return getInstance().get(`/api/customer/v1/payment/transaction?page=${page}`)
    .catch(function (error) {
      return error.response
    })
}

export const fetchInvoice = async (page) => {
  return getInstance().get(`/api/customer/v1/payment/invoice?page=${page}`)
    .catch(function (error) {
      return error.response
    })
}