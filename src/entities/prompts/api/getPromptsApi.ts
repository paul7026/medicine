import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetPromptsResponse } from '../types'

export const getPromptsApi = createThunkWithErrorHandler<
  GetPromptsResponse,
  void
>('prompts/getPrompts', async () => {
  const response = await $api.get('/prompt/list')

  return response.data
})
