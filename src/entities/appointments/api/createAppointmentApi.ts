import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { CreateAppointmentPayload } from '../types'

export const createAppointmentApi = createThunkWithErrorHandler<
  void,
  CreateAppointmentPayload
>('appointments/createAppointment', async (payload) => {
  const response = await $api.post(`/appointment`, {
    ...payload,
  })

  return response.data
})
