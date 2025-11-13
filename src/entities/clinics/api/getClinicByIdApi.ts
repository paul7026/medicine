import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetClinicByIdPayload } from '../types'

export const getClinicByIdApi = createThunkWithErrorHandler<
  GetClinicByIdPayload,
  string
>('clinics/getClinicById', async (clinic_id) => {
  const response = await $api.get(`/clinics/${clinic_id}`)

  return response.data
})
