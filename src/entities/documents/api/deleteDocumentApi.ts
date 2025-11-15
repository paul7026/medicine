import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

export const deleteDocumentApi = createThunkWithErrorHandler<void, string>(
  'documents/deleteDocument',
  async (document_id) => {
    const response = await $api.delete(`/document/${document_id}`, {})

    return response.data
  }
)
