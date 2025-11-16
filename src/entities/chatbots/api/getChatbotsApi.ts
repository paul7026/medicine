import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetChatbotsResponse } from '../types'

export const getChatbotsApi = createThunkWithErrorHandler<
  GetChatbotsResponse,
  string | undefined
>('chatbots/getChatbots', async () => {
  const response = await $api.get(`/chatbot/list`)

  return response.data
})
