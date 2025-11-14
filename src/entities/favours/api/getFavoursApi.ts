import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetFavoursResponse } from '../types'

export const getFavoursApi = createThunkWithErrorHandler<
  GetFavoursResponse,
  void
>('favours/getFavours', async () => {
  const response = await $api.get('/favour/list')

  return response.data
})
