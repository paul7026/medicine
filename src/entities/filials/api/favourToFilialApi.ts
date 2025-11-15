import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { FavourToFilialPayload } from '../types'

export const favourToFilialApi = createThunkWithErrorHandler<
  void,
  FavourToFilialPayload
>('filials/favourToFilial', async (payload) => {
  // TODO проверить запрос
  const response = await $api.post('favour/favour-to-filial', {
    ...payload,
  })

  return response.data
})
