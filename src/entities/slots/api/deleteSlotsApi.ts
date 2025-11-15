import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { DeleteSlotsPayload } from '../types'

export const deleteSlotsApi = createThunkWithErrorHandler<
  void,
  DeleteSlotsPayload
>('slots/deleteSlots', async (payload) => {
  const response = await $api.post('/slot/delete', {
    ...payload,
  })

  return response.data
})
