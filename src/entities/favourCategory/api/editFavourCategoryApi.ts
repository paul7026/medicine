import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { EditFavourCategoryPayload } from '../types'

export const editFavourCategoryApi = createThunkWithErrorHandler<
  void,
  EditFavourCategoryPayload
>(
  'favourCategories/editFavourCategory',
  async ({ category_id, ...payload }) => {
    const response = await $api.patch(`/favour-category/${category_id}`, {
      ...payload,
    })

    return response.data
  }
)
