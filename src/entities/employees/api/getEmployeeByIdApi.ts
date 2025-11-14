import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetEmployeeByIdResponse } from '../types'

export const getEmployeeByIdApi = createThunkWithErrorHandler<
  GetEmployeeByIdResponse,
  string
>('employees/getEmployeeById', async (employee_id) => {
  const response = await $api.get(`/admin/employee/${employee_id}`)

  return response.data
})
