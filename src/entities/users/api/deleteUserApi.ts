import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

export const deleteUserApi = createThunkWithErrorHandler<void, string>(
  'admins/deleteUser',
  async (userId) => {
    const response = await $api.delete(`/admins/${userId}`, {})

    return response.data
  }
)
