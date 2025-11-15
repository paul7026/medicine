import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetPromptByIdPayload } from '../types'

export const getPromptByIdApi = createThunkWithErrorHandler<
  GetPromptByIdPayload,
  string
>('prompts/getPromptById', async (prompt_id) => {
  const response = await $api.get(`/prompt/${prompt_id}`)

  return response.data
})
