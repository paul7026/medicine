import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { CreateDocumentPayload } from '../types'

export const createDocumentApi = createThunkWithErrorHandler<
  void,
  CreateDocumentPayload
>('documents/createDocument', async ({ clinic_id, file, name }) => {
  const formData = new FormData()

  formData.append('file', file)
  formData.append('clinic_id', clinic_id)
  formData.append('name', name)

  const response = await $api.post('/document', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return response.data
})
