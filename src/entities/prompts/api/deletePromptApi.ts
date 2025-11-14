import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

export const deletePromptApi = createThunkWithErrorHandler<void, string>(
  'prompts/deletePrompt',
  async (promptId) => {
    const response = await $api.delete(`/prompt/${promptId}`, {})

    return response.data
  }
)
