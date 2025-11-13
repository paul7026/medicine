import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetUsersResponse } from '../types'

export const getUsersApi = createThunkWithErrorHandler<GetUsersResponse, void>(
  'users/getUsers',
  async () => {
    const response = await $api.get('/users/')

    return response.data
  }
)
