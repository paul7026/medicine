import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

export const deleteScheduleConnectionApi = createThunkWithErrorHandler<
  void,
  string
>('scheduleConnections/deleteScheduleConnection', async (connection_id) => {
  await $api.delete(`/schedule-connection/${connection_id}`, {})
})
