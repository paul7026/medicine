import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetWhoAmIResponse } from '../types'

export const getWhoAmIApi1 = createThunkWithErrorHandler<
  GetWhoAmIResponse,
  void
>('auth/getWhoAmI', async () => {
  const response = await $api.get('/transport-storages/get-choices/')

  return response.data
})
