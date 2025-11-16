import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetEmployeesResponse } from '../types'

export const getEmployeesApi = createThunkWithErrorHandler<
  GetEmployeesResponse,
  string | undefined
>('employees/getEmployees', async (queryStr) => {
  const response = await $api.get(
    `/employee/list${queryStr ? '?' + queryStr : ''}`
  )

  return response.data
})

export const getAllEmployeesForFormApi = createThunkWithErrorHandler<
  GetEmployeesResponse,
  string | undefined
>('employees/getAllEmployeesForForm', async (queryStr) => {
  const response = await $api.get(
    `/employee/list${queryStr ? '?' + queryStr : ''}`
  )

  return response.data
})

export const getSelectedEmployeesForFormApi = createThunkWithErrorHandler<
  GetEmployeesResponse,
  string | undefined
>('employees/getSelectedEmployeesForForm', async (queryStr) => {
  const response = await $api.get(
    `/employee/list${queryStr ? '?' + queryStr : ''}`
  )

  return response.data
})
