import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetAppointmentByIdResponse } from '../types'

export const getAppointmentByIdApi = createThunkWithErrorHandler<
  GetAppointmentByIdResponse,
  string
>('appointments/getAppointmentById', async (appointment_id) => {
  const response = await $api.get(`/appointment/${appointment_id}`)

  return response.data
})
