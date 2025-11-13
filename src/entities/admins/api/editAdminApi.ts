import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { EditAdminPayload } from '../types'

export const editAdminApi = createThunkWithErrorHandler<void, EditAdminPayload>(
  'admins/editAdmin',
  async ({ admin_id, ...payload }) => {
    const response = await $api.patch(`/admins/${admin_id}`, {
      ...payload,
    })

    return response.data
  }
)
