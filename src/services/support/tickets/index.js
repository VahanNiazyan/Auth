import { getInstance } from '@/configs/axios'

export const fetchTickets = async (filter) => {
  return getInstance().get(`/api/customer/v1/support/tickets?${filter}`)
    .catch(function (error) {
      return error.response
    })
}