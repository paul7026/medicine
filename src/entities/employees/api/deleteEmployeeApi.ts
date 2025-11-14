import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

export const deleteEmployeeApi = createThunkWithErrorHandler<void, string>(
  'employees/deleteEmployee',
  async (employee_id) => {
    const response = await $api.delete(`/admin/employee/${employee_id}`, {})

    return response.data
  }
)
