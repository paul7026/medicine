import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

interface EditClinicPayload {
  clinic_id: string
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

export const editClinicApi = createThunkWithErrorHandler<
  void,
  EditClinicPayload
>('clinics/editClinic', async ({ clinic_id, ...payload }) => {
  const response = await $api.patch(`/clinics/${clinic_id}`, {
    ...payload,
  })

  return response.data
})
