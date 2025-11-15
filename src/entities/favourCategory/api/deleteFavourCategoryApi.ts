import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

export const deleteFavourCategoryApi = createThunkWithErrorHandler<
  void,
  string
>('favourCategories/deleteFavourCategory', async (category_id) => {
  const response = await $api.delete(`/favour-category/${category_id}`, {})

  return response.data
})
