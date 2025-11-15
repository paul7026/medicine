import { GetWhoAmIResponse } from '@entities/auth/types'

export const getTenantType = (): GetWhoAmIResponse['tenant'] => {
  try {
    const tenantString = localStorage.getItem('tenant')

    if (!tenantString) {
      return null
    }

    const tenant: GetWhoAmIResponse = JSON.parse(tenantString)

    return tenant.tenant ?? null
  } catch {
    return null
  }
}
