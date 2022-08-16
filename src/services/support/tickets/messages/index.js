import { getInstance } from '@/configs/axios'

export const sendMessage = async (form, ticketId) => {
  return await getInstance()
    .post(`/api/customer/v1/support/tickets/${ticketId}/message`, {...form})
    .catch(function (error) {
      return error.response
    })
}
