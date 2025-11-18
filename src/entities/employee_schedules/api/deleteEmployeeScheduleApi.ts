import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

export const deleteEmployeeScheduleApi = createThunkWithErrorHandler<
  void,
  string
>('employeeSchedules/deleteEmployeeSchedule', async (schedule_id) => {
  const response = await $api.delete(`/employee-schedule/${schedule_id}`, {})

  return response.data
})
