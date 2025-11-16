import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetAppointmentsResponse } from '../types'

export const getAppointmentsApi = createThunkWithErrorHandler<
  GetAppointmentsResponse,
  void
>('appointments/getAppointments', async () => {
  const response = await $api.get('/appointment/list')

  return response.data
})
