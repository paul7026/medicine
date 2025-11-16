import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetChatbotStatusResponse } from '../types'

export const getChatbotStatusApi = createThunkWithErrorHandler<
  GetChatbotStatusResponse,
  string
>('chatbots/getChatbotStatus', async (chatbot_id) => {
  const response = await $api.get(`/chatbot/${chatbot_id}/status`)

  return response.data
})
