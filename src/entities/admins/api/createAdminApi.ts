import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { CreateAdminApiPayload } from '../types'

export const createAdminApi = createThunkWithErrorHandler<
  void,
  CreateAdminApiPayload
>('admins/createAdmin', async (payload) => {
  const response = await $api.post('/admins/', {
    ...payload,
  })

  return response.data
})
