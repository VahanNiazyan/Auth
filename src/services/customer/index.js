import { getInstance } from '@/configs/axios'

export const fetchCustomer = async () => {
  return getInstance().get('/api/customer/v1/customer')
    .catch(function (error) {
      return error.response
    })
}