import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetFilialsResponse } from '../types'

export const getSelectedFilialsForFormApi = createThunkWithErrorHandler<
  GetFilialsResponse,
  string | undefined
>('filials/getSelectedFilialsForForm', async (queryStr) => {
  const response = await $api.get(
    `/filial/list${queryStr ? '?' + queryStr : ''}`
  )

  return response.data
})
