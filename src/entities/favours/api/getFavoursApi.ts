import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetFavoursResponse } from '../types'

export const getFavoursApi = createThunkWithErrorHandler<
  GetFavoursResponse,
  string | undefined
>('favours/getFavours', async (queryStr) => {
  const response = await $api.get(
    `/favour/list${queryStr ? '?' + queryStr : ''}`
  )

  return response.data
})

export const getAllFavoursForFormApi = createThunkWithErrorHandler<
  GetFavoursResponse,
  string | undefined
>('favours/getAllFavoursForForm', async (queryStr) => {
  const response = await $api.get(
    `/favour/list${queryStr ? '?' + queryStr : ''}`
  )

  return response.data
})

export const getSelectedFavoursForFormApi = createThunkWithErrorHandler<
  GetFavoursResponse,
  string | undefined
>('favours/getSelectedFavoursForForm', async (queryStr) => {
  const response = await $api.get(
    `/favour/list${queryStr ? '?' + queryStr : ''}`
  )

  return response.data
})
