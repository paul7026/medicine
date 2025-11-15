import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetDocumentsResponse } from '../types'

export const getDocumentsApi = createThunkWithErrorHandler<
  GetDocumentsResponse,
  void
>('documents/getDocuments', async () => {
  const response = await $api.get(`/document/list`)

  return response.data
})
