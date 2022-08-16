import { getInstance } from '@/configs/axios'

export const fetchCustomerProfile = async (form) => {
  return getInstance().patch('/api/customer/v1/profile', { ...form })
    .catch(function (error) {
      return error.response
    })
}

export const fetchCustomerPassword = async (form) => {
  return getInstance().patch('/api/customer/v1/profile/password', { ...form })
    .catch(function (error) {
      return error.response
    })
}
