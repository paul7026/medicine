import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { EditUserPayload } from '../types'

export const editUserApi = createThunkWithErrorHandler<void, EditUserPayload>(
  'users/editUser',
  async ({ user_id, ...payload }) => {
    const response = await $api.patch(`/users/${user_id}`, {
      ...payload,
    })

    return response.data
  }
)
