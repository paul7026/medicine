import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { EditFilialPayload } from '../types'

export const editFilialApi = createThunkWithErrorHandler<
  void,
  EditFilialPayload
>('filials/editFilial', async ({ filial_id, ...payload }) => {
  const response = await $api.patch(`/admin/filial/${filial_id}`, {
    ...payload,
  })

  return response.data
})
