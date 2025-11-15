import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetScheduleConnectionByIdResponse } from '../types'

export const getScheduleConnectionByIdApi = createThunkWithErrorHandler<
  GetScheduleConnectionByIdResponse,
  string
>('scheduleConnections/getScheduleConnectionById', async (connection_id) => {
  const response = await $api.get(`/schedule-connection/${connection_id}`)

  return response.data
})
