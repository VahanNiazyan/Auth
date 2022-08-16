const ServerStatusEnum = Object.freeze({
    INSTALL_STATUS_ALLOCATING: 'allocating',
    INSTALL_STATUS_BUILDING: 'building',
    INSTALL_STATUS_AMPHORA_READY: 'amphora-ready',
    INSTALL_STATUS_CONTEXTUALIZATION: 'contextualization',
    INSTALL_STATUS_DONE: 'installed',
    INSTALL_STATUS_DELETING: 'deleting',
    INSTALL_STATUS_DELETING_ERROR: 'error-deleting',
    INSTALL_STATUS_DELETED: 'deleted',
    INSTALL_STATUS_TRANSFER: 'transfer',
    INSTALL_STATUS_ERROR_CREATING: 'error-creating',
    POWER_STARTED: 'started',
    POWER_STOPPED: 'stopped'
})

export default ServerStatusEnum