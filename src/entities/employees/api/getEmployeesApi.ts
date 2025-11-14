import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetEmployeesResponse } from '../types'

export const getEmployeesApi = createThunkWithErrorHandler<
  GetEmployeesResponse,
  void
>('employees/getEmployees', async () => {
  const response = await $api.get('/admin/employee/list')

  return response.data
})
