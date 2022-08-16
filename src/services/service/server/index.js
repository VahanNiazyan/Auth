import { getInstance } from '@/configs/axios'

export const fetchServers = async (data) => {
  if (data.query) {
    data.query = `&query=${data.query}`
  }

  return getInstance().get(`/api/customer/v1/service/server?page=${data.page}${data.query}`)
    .catch(function (error) {
      return error.response
    })
}

export const fetchServer = async (serverId) => {
  return getInstance().get(`/api/customer/v1/service/server/${serverId}`)
    .catch(function (error) {
      return error.response
    })
}

export const fetchServerRegions = async () => {
  return getInstance().get('/api/customer/v1/service/server/regions')
    .catch(function (error) {
      return error.response
    })
}

export const fetchServerCreate = async (form) => {
  return await getInstance().post('/api/customer/v1/service/server', { ...form })
    .catch(function (error) {
      return error.response
    })
}

export const fetchServerAction = async (form) => {
  return await getInstance().post(`/api/customer/v1/service/server/${form.serverId}/${form.action}`)
    .catch(function (error) {
      return error.response
    })
}

export const fetchServerTab = async (form) => {
  return await getInstance().get(`/api/customer/v1/service/server/${form.serverId}/${form.tab}`)
    .catch(function (error) {
      return error.response
    })
}

export const fetchServerExtend = async (data) => {
  return await getInstance().post(`/api/customer/v1/service/server/${data.serverId}/extend`, { ...data.form })
    .catch(function (error) {
      return error.response
    })
}

export const fetchServerCreateSnapshot = async (serverId) => {
  return await getInstance().post(`/api/customer/v1/service/server/${serverId}/snapshot`)
    .catch(function (error) {
      return error.response
    })
}

export const fetchServerCreateAdditionalDisk = async (data) => {
  return await getInstance().post(`/api/customer/v1/service/server/${data.serverId}/disk`, { ...data.form })
    .catch(function (error) {
      return error.response
    })
}

export const fetchServerCancelAdditionalDisk = async (data) => {
  return await getInstance().delete(`/api/customer/v1/service/server/${data.serverId}/disk/${data.diskId}`)
    .catch(function (error) {
      return error.response
    })
}

export const fetchServerDiskPrice = async (data) => {
  const query = `storage_class=${data.form.storage_class}&size=${data.form.size}&auto_format=${data.form.auto_format}`

  return await getInstance().post(`/api/customer/v1/service/server/${data.serverId}/disk/pricing?${query}`)
    .catch(function (error) {
      return error.response
    })
}

export const fetchServerStorageClasses = async (serverId) => {
  return await getInstance().get(`/api/customer/v1/service/server/${serverId}/storage-classes`)
    .catch(function (error) {
      return error.response
    })
}

export const fetchServerSettings = async (data) => {
  return await getInstance().patch(`/api/customer/v1/service/server/${data.serverId}/settings`, { ...data.form })
    .catch(function (error) {
      return error.response
    })
}

export const fetchRequestRDNS = async (data) => {
  return await getInstance().post(`/api/customer/v1/service/server/port/${data.portId}/ip-allocation/${data.ipAllocationId}/reverse-record`, { ...data.form })
    .catch(function (error) {
      return error.response
    })
}

export const fetchServerSnapshotRestore = async (data) => {
  return await getInstance().post(`/api/customer/v1/service/server/${data.serverId}/snapshot/${data.snapshotId}`)
    .catch(function (error) {
      return error.response
    })
}

export const fetchServerSnapshotDelete = async (data) => {
  return await getInstance().delete(`/api/customer/v1/service/server/${data.serverId}/snapshot/${data.snapshotId}`)
    .catch(function (error) {
      return error.response
    })
}

export const fetchServerMeta = async (data) => {
  return await getInstance().patch(`/api/customer/v1/service/server/${data.serverId}/meta`, { ...data.form })
    .catch(function (error) {
      return error.response
    })
}

export const fetchServerImages = async (serverId) => {
  return await getInstance().get(`/api/customer/v1/service/server/${serverId}/images`)
    .catch(function (error) {
      return error.response
    })
}

export const fetchServerFlavor = async (serverId) => {
  return await getInstance().get(`/api/customer/v1/service/server/${serverId}/flavors`)
    .catch(function (error) {
      return error.response
    })
}

export const fetchServerFlavorUpgrade = async (data) => {
  return await getInstance().post(`/api/customer/v1/service/server/${data.serverId}/flavor-upgrade`, { ...data.form })
    .catch(function (error) {
      return error.response
    })
}

export const fetchServerFlavorCalculation = async (serverId) => {
  return await getInstance().get(`/api/customer/v1/service/server/${serverId}/upgrades-calculation`)
    .catch(function (error) {
      return error.response
    })
}

export const fetchReInstallServer = async (data) => {
  return await getInstance().post(`/api/customer/v1/service/server/${data.serverId}/reinstall`, { ...data.form })
    .catch(function (error) {
      return error.response
    })
}

export const fetchServerUpgrades = async (serverId) => {
  return await getInstance().get(`/api/customer/v1/service/server/${serverId}/upgrades`)
    .catch(function (error) {
      return error.response
    })
}
