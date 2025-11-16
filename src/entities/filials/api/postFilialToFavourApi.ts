import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { PostFilialToFavourPayload } from '../types'

export const postFilialToFavourApi = createThunkWithErrorHandler<
  void,
  PostFilialToFavourPayload
>('filials/postFilialToFavour', async (payload) => {
  const response = await $api.post('/filial/filial-to-favour', {
    ...payload,
  })

  return response.data
})
