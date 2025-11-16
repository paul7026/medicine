import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetSlotsResponse } from '../types'

export const getSlotsWIthQueryStrApi = createThunkWithErrorHandler<
  GetSlotsResponse,
  string | undefined
>('slots/getSlotsWIthQueryStr', async (queryStr) => {
  const response = await $api.get(`/slot/list${queryStr ? '?' + queryStr : ''}`)

  return response.data
})
