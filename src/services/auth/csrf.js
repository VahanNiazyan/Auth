import { CsrfInstance } from '@/configs/axios'

export const CSRFRequest = async () => {
  return await CsrfInstance.get('/sanctum/csrf-cookie')
}
