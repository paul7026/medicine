import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetEmployeeScheduleResponse } from '../types'

export const getEmployeeScheduleApi = createThunkWithErrorHandler<
  GetEmployeeScheduleResponse,
  string | undefined
>('employeeSchedules/getEmployeeSchedule', async (queryStr) => {
  const response = await $api.get(
    `/employee-schedule/list${queryStr ? '?' + queryStr : ''}`
  )

  return response.data
})
