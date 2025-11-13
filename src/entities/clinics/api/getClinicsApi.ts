import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetClinicsResponse } from '../types'

export const getClinicsApi = createThunkWithErrorHandler<
  GetClinicsResponse,
  void
>('clinics/getClinics', async () => {
  const response = await $api.get('/clinics/')

  return response.data
})
