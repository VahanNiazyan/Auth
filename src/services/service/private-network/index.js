import { getInstance } from '@/configs/axios'

export const fetchServerPrivateNetwork = async (data) => {
  return await getInstance().get(`/api/customer/v1/service/pool?page=${data.page}`)
    .catch(function (error) {
      return error.response
    })
}

export const fetchDeleteServerPrivateNetwork = async (networkId) => {
  return await getInstance().delete(`/api/customer/v1/service/pool/${networkId}`)
    .catch(function (error) {
      return error.response
    })
}

export const fetchPrivateNetworkRegion = async () => {
  return await getInstance().get('/api/customer/v1/service/pool/region')
    .catch(function (error) {
      return error.response
    })
}

export const fetchCreatePrivateNetwork = async (form) => {
  return await getInstance().post('/api/customer/v1/service/pool', { ...form })
    .catch(function (error) {
      return error.response
    })
}

export const fetchAvailablePools = async (serverId) => {
  return await getInstance().get(`/api/customer/v1/service/server/${serverId}/available-pools`)
    .catch(function (error) {
      return error.response
    })
}

export const fetchCreatePort = async (data) => {
  return await getInstance().post(`/api/customer/v1/service/server/${data.serverId}/port`, { ...data.form })
    .catch(function (error) {
      return error.response
    })
}
