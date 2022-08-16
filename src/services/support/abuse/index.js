import { getInstance } from '@/configs/axios'

export const fetchAbuseCases = async () => {
  return getInstance().get('/api/customer/v1/support/abuse')
}

export const fetchAbuseCase = async (abuseId) => {
  return getInstance().get(`/api/customer/v1/support/abuse/${abuseId}`)
    .catch(function (error) {
      return error.response
    })
}

export const submitAbuseStatement = async (form, abuseId) => {
  return await getInstance()
    .post(`/api/customer/v1/support/abuse/${abuseId}/statement`, {...form})
    .catch(function (error) {
      return error.response
    })
}
