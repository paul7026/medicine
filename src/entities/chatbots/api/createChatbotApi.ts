import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { CreateChatbotPayload } from '../types'

export const createChatbotApi = createThunkWithErrorHandler<
  void,
  CreateChatbotPayload
>('chatbots/createChatbot', async (payload) => {
  const response = await $api.post('/chatbot', {
    ...payload,
  })

  return response.data
})
