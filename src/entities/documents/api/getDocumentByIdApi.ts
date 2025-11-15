import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetDocumentByIdResponse } from '../types'

export const getDocumentByIdApi = createThunkWithErrorHandler<
  GetDocumentByIdResponse,
  string
>('documents/getDocumentById', async (document_id) => {
  const response = await $api.get(`/document/${document_id}`)

  return response.data
})
