import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetUserByIdResponse } from '../types'

export const getUserByIdApi = createThunkWithErrorHandler<
  GetUserByIdResponse,
  string
>('users/getUserById', async (userId) => {
  const response = await $api.get(`/users/${userId}`)

  return response.data
})
