import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { EditScheduleConnectionPayload } from '../types'

export const editScheduleConnectionApi = createThunkWithErrorHandler<
  void,
  EditScheduleConnectionPayload
>(
  'scheduleConnections/editScheduleConnection',
  async ({ connection_id, ...payload }) => {
    await $api.patch(`/schedule-connection/${connection_id}`, {
      ...payload,
    })
  }
)
