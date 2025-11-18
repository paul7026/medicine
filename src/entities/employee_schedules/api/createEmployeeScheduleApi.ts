import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { CreateEmployeeSchedulePayload } from '../types'

export const createEmployeeScheduleApi = createThunkWithErrorHandler<
  void,
  CreateEmployeeSchedulePayload
>('employeeSchedules/createEmployeeSchedule', async (payload) => {
  const response = await $api.post('/employee-schedule', {
    ...payload,
  })

  return response.data
})
