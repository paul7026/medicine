import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetChatbotByIdResponse } from '../types'

export const getChatbotByIdApi = createThunkWithErrorHandler<
  GetChatbotByIdResponse,
  string
>('chatbots/getChatbotById', async (chatbot_id) => {
  const response = await $api.get(`/chatbot/${chatbot_id}`)

  return response.data
})
