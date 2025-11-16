import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { CreateEmployeePayload } from '../types'

export const createEmployeeApi = createThunkWithErrorHandler<
  void,
  CreateEmployeePayload
>('employees/createEmployee', async (payload) => {
  const response = await $api.post('/employee/', {
    ...payload,
  })

  return response.data
})
