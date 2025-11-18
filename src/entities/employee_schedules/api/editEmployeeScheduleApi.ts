import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { EditEmployeeSchedulePayload } from '../types'

export const editEmployeeScheduleApi = createThunkWithErrorHandler<
  void,
  EditEmployeeSchedulePayload
>(
  'employeeSchedules/editEmployeeSchedule',
  async ({ schedule_id, ...payload }) => {
    const response = await $api.patch(`/employee-schedule/${schedule_id}`, {
      ...payload,
    })

    return response.data
  }
)
