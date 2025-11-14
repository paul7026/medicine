import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

export const deleteFilialApi = createThunkWithErrorHandler<void, string>(
  'filials/deleteFilial',
  async (filial_id) => {
    const response = await $api.delete(`/admin/filial/${filial_id}`, {})

    return response.data
  }
)
