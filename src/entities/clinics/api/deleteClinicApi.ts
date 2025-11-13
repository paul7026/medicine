import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

export const deleteClinicApi = createThunkWithErrorHandler<void, string>(
  'clinics/deleteClinic',
  async (clinic_id) => {
    const response = await $api.delete(`/clinics/${clinic_id}`, {})

    return response.data
  }
)
