import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetFilialsResponse } from '../types'

export const getFilialsApi = createThunkWithErrorHandler<
  GetFilialsResponse,
  void
>('filials/getClinics', async () => {
  const response = await $api.get('/admin/filial/list')

  return response.data
})
