import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { EditFavourPayload } from '../types'

export const editFavourApi = createThunkWithErrorHandler<
  void,
  EditFavourPayload
>('favours/editFavour', async ({ favour_id, ...payload }) => {
  const response = await $api.patch(`/favour/${favour_id}`, {
    ...payload,
  })

  return response.data
})
