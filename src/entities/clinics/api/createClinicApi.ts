import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

interface CreateClinicPayload {
  title: string
  legal_name: string
  managed_by: string
  website?: string
  legal_address?: string
  legal_data?: {
    additionalProp1: object
  }
  phones?: string
  email?: string
  description?: string
}

export const createClinicApi = createThunkWithErrorHandler<
  void,
  CreateClinicPayload
>('clinics/createClinic', async (payload) => {
  const response = await $api.post('/clinics/', {
    ...payload,
  })

  return response.data
})
