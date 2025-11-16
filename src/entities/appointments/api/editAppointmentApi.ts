import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { EditAppointmentPayload } from '../types'

export const editAppointmentApi = createThunkWithErrorHandler<
  void,
  EditAppointmentPayload
>('appointments/editAppointment', async ({ appointment_id, ...payload }) => {
  const response = await $api.patch(`/appointment/${appointment_id}`, {
    ...payload,
  })

  return response.data
})
