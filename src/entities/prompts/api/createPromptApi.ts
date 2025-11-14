import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { CreatePromptPayload } from '../types'

export const createPromptApi = createThunkWithErrorHandler<
  void,
  CreatePromptPayload
>('prompts/createPrompt', async (payload) => {
  const response = await $api.post('/prompt', {
    ...payload,
  })

  return response.data
})
