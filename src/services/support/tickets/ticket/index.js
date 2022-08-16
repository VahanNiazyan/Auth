import { getInstance } from '@/configs/axios'

export const fetchTicket = async (ticketId) => {
  return getInstance().get(`/api/customer/v1/support/tickets/${ticketId}`)
    .catch(function (error) {
      return error.response
    })
}

export const createTicket = async (form) => {
  return await getInstance()
    .post('/api/customer/v1/support/tickets', {...form})
    .catch(function (error) {
      return error.response
    })
}

export const rateTicket = async (ticketId, form) => {
  return await getInstance()
    .post(`/api/customer/v1/support/tickets/${ticketId}/rating`, {...form})
    .catch(function (error) {
      return error.response
    })
}

export const closeTicket = async (form, ticketId) => {
  return await getInstance()
    .patch(`/api/customer/v1/support/tickets/${ticketId}`, {...form})
    .catch(function (error) {
      return error.response
    })
}
