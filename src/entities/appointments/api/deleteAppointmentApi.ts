import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

export const deleteAppointmentApi = createThunkWithErrorHandler<void, string>(
  'appointments/deleteAppointment',
  async (appointment_id) => {
    const response = await $api.delete(`/appointment/${appointment_id}`, {})

    return response.data
  }
)
