import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { PostFilialToEmployeePayload } from '../types'

export const postFilialToEmployeeApi = createThunkWithErrorHandler<
  void,
  PostFilialToEmployeePayload
>('filials/postFilialToEmployee', async (payload) => {
  const response = await $api.post('/filial/filial-to-employee', {
    ...payload,
  })

  return response.data
})
