import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetScheduleConnectionsResponse } from '../types'

export const getScheduleConnectionsApi = createThunkWithErrorHandler<
  GetScheduleConnectionsResponse,
  void
>('scheduleConnections/getScheduleConnections', async () => {
  const response = await $api.get('/schedule-connection/list')

  return response.data
})
