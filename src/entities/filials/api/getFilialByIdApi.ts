import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetFilialByIdPayload } from '../types'

export const getFilialByIdApi = createThunkWithErrorHandler<
  GetFilialByIdPayload,
  string
>('filials/getFilialById', async (filial_id) => {
  const response = await $api.get(`/admin/filial/${filial_id}`)

  return response.data
})
