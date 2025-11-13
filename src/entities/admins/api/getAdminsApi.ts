import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetAdminsResponse } from '../types'

export const getAdminsApi = createThunkWithErrorHandler<
  GetAdminsResponse,
  void
>('admins/getAdmins', async () => {
  const response = await $api.get('/admins/')

  return response.data
})
