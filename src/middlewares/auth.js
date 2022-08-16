import { getCustomer, unsetCustomer } from '@/configs/axios/token'

export default async ({ next }) => {
  const customer = getCustomer()

  if (!customer) {
    unsetCustomer()

    return next('/login')
  } else if (!customer.email_verified_at) {
    return next('/verify')
  }

  return next()
}