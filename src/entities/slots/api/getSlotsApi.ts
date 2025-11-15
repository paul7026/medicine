import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { buildSlotsQueryString } from './helpers'

import { GetSlotsPayload, GetSlotsResponse } from '../types'

export const getSlotsApi = createThunkWithErrorHandler<
  GetSlotsResponse,
  GetSlotsPayload | void
>('slots/getSlots', async (payload) => {
  const queryString = buildSlotsQueryString(payload)
  const url = `/slot/list${queryString}`

  const response = await $api.get(url)

  return response.data
})
