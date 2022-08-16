import { getInstance } from '@/configs/axios'

export const fetchPasswordForget = async (form) => {
  return await getInstance().post('/api/customer/v1/auth/password/email', { ...form })
    .catch(function (error) {
      return error.response
    })
}