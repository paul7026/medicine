import { buildPaginationQueryString } from '@shared/helpers/buildPaginationQueryString'
import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetAdminsPayload, GetAdminsResponse } from '../types'

export const getAdminsApi = createThunkWithErrorHandler<
  GetAdminsResponse,
  GetAdminsPayload | void
>('admins/getAdmins', async (payload) => {
  const queryString = buildPaginationQueryString(payload)
  const url = `/admins/${queryString}`

  const response = await $api.get(url)

  return response.data
})
