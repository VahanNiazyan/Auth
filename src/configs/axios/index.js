import axios from 'axios'
import { getToken, unsetToken } from '@/configs/axios/token'
import { createToaster } from '@meforma/vue-toaster'

/**
 * @returns {AxiosInstance}
 */
export const getInstance = () => {
    const toaster = createToaster()

    const axiosInstance = axios.create({
        headers: {
            'Accept': 'application/json',
        },
        'default': {
            withCredentials: true
        }
    })

    axiosInstance.interceptors.response.use((r) => r, async ({response}) => {
        if (response.status === 401) {
            unsetToken()
        }

        if (response.status >= 500) {
            toaster.error('We couldn\'t process your request at the moment. Please try again later')
        }

        return response
    })

    return axiosInstance
}


export const getInstanceWithToken = () => {
    const token = getToken();

    return getInstance({
        headers: token ? { Authorization: `Bearer ${token}`} : {}
    })
}

export const CsrfInstance = axios.create({
    headers: {
        'Accept': 'application/json',
    }
})
