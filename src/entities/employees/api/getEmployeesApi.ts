import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetEmployeesResponse } from '../types'

export const getEmployeesApi = createThunkWithErrorHandler<
  GetEmployeesResponse,
  string | undefined
>('employees/getEmployees', async (queryStr) => {
  const response = await $api.get(
    `/admin/employee/list${queryStr ? '?' + queryStr : ''}`
  )

  return response.data
})
