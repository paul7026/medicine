import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { EditPromptPayload } from '../types'

export const editPromptApi = createThunkWithErrorHandler<
  void,
  EditPromptPayload
>('prompts/editPrompt', async ({ prompt_id, ...payload }) => {
  const response = await $api.patch(`/prompt/${prompt_id}`, {
    ...payload,
  })

  return response.data
})
