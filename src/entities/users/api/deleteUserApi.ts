import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

export const deleteUserApi = createThunkWithErrorHandler<void, string>(
  'users/deleteUser',
  async (userId) => {
    const response = await $api.delete(`/users/${userId}`, {})

    return response.data
  }
)
