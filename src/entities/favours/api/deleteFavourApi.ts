import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

export const deleteFavourApi = createThunkWithErrorHandler<void, string>(
  'favours/deleteFavour',
  async (favour_id) => {
    const response = await $api.delete(`/favour/${favour_id}`, {})

    return response.data
  }
)
