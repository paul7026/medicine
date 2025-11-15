import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { CreateFavourPayload } from '../types'

export const createFavourApi = createThunkWithErrorHandler<
  void,
  CreateFavourPayload
>('favours/createFavour', async (payload) => {
  const response = await $api.post('/favour', {
    ...payload,
  })

  return response.data
})
