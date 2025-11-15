import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { CreateFavourCategoryPayload } from '../types'

export const createFavourCategoryApi = createThunkWithErrorHandler<
  void,
  CreateFavourCategoryPayload
>('favourCategories/createFavourCategory', async (payload) => {
  const response = await $api.post('/favour-category', {
    ...payload,
  })

  return response.data
})
