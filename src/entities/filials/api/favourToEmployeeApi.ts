import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { FavourToEmployeePayload } from '../types'

export const favourToEmployeeApi = createThunkWithErrorHandler<
  void,
  FavourToEmployeePayload
>('filials/favourToEmployee', async (payload) => {
  const response = await $api.post('favour/favour-to-employee', {
    ...payload,
  })

  return response.data
})
