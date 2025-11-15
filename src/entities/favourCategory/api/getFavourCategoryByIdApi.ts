import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetFavourCategoryByIdResponse } from '../types'

export const getFavourCategoryByIdApi = createThunkWithErrorHandler<
  GetFavourCategoryByIdResponse,
  string
>('favourCategories/getFavourCategoryById', async (category_id) => {
  const response = await $api.get(`/favour-category/${category_id}`)

  return response.data
})
