import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetFavourByIdResponse } from '../types'

export const getFavourByIdApi = createThunkWithErrorHandler<
  GetFavourByIdResponse,
  string
>('favours/getFavoursById', async (favour_id) => {
  const response = await $api.get(`/favour/${favour_id}`)

  return response.data
})
