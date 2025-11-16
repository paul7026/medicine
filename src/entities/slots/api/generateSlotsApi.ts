import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { DeleteSlotsPayload } from '../types'

export const generateSlotsApi = createThunkWithErrorHandler<
  void,
  DeleteSlotsPayload
>('slots/generateSlots', async (payload) => {
  const response = await $api.post('/slot/generate', {
    ...payload,
  })

  return response.data
})
