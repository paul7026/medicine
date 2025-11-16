import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { EditEmployeePayload } from '../types'

export const editEmployeeApi = createThunkWithErrorHandler<
  void,
  EditEmployeePayload
>('employees/editEmployee', async ({ employee_id, ...payload }) => {
  const response = await $api.patch(`/employee/${employee_id}`, {
    ...payload,
  })

  return response.data
})
