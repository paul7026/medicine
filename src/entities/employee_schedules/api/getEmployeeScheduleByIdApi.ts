import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetEmployeeScheduleByIdResponse } from '../types'

export const getEmployeeScheduleByIdApi = createThunkWithErrorHandler<
  GetEmployeeScheduleByIdResponse,
  string
>('employeeSchedules/getEmployeeScheduleById', async (schedule_id) => {
  const response = await $api.get(`/employee-schedule/${schedule_id}`)

  return response.data
})
