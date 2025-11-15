import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { CreateScheduleConnectionPayload } from '../types'

export const createScheduleConnectionApi = createThunkWithErrorHandler<
  void,
  CreateScheduleConnectionPayload
>('scheduleConnections/createScheduleConnection', async (payload) => {
  await $api.post('/schedule-connection', payload)
})
