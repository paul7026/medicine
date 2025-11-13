import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

export const deleteAdminApi = createThunkWithErrorHandler<void, string>(
  'admins/deleteAdmin',
  async (adminId) => {
    const response = await $api.delete(`/admins/${adminId}`, {})

    return response.data
  }
)
