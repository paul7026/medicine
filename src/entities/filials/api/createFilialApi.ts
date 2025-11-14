import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { CreateFilialPayload } from '../types'

export const createFilialApi = createThunkWithErrorHandler<
  void,
  CreateFilialPayload
>('filials/createFilial', async (payload) => {
  const response = await $api.post('/admin/filial/', {
    ...payload,
  })

  return response.data
})
