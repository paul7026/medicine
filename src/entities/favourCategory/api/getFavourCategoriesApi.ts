import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetFavourCategoriesResponse } from '../types'

export const getFavourCategoriesApi = createThunkWithErrorHandler<
  GetFavourCategoriesResponse,
  string | undefined
>('favourCategories/getFavourCategories', async (queryStr) => {
  const response = await $api.get(
    `/favour-category/list${queryStr ? '?' + queryStr : ''}`
  )

  return response.data
})
