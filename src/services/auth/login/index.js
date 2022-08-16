import { getInstance } from '@/configs/axios'
import { CSRFRequest } from '@/services/auth/csrf'

export const fetchUserLogin = async (form) => {
  await CSRFRequest();

  return await getInstance().post('/api/customer/v1/auth/login', { ...form })
    .catch(function (error) {
      return error.response
    })
}

export const fetchUserLogOut = async () => {
  await CSRFRequest()

  return await getInstance().post('/api/customer/v1/auth/logout')
}

export const fetchRefreshToken = async () => {
  return await getInstance().get('refresh')
}
