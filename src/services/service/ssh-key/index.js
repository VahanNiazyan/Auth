import { getInstance } from '@/configs/axios'

export const fetchSshKeys = async () => {
  return getInstance().get('/api/customer/v1/service/ssh-key')
}

export const fetchCreateSshKey = async (form) => {
  return await getInstance()
    .post('/api/customer/v1/service/ssh-key', {...form})
    .catch(function (error) {
      return error.response
    })
}

export const fetchDeleteSshKey = async (sshKeyId) => {
  return await getInstance()
    .delete(`/api/customer/v1/service/ssh-key/${sshKeyId}`)
    .catch(function (error) {
      return error.response
    })
}