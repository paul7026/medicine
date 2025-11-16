import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

export const stopChatbotApi = createThunkWithErrorHandler<void, string>(
  'chatbots/stopChatbot',
  async (chatbot_id) => {
    const response = await $api.post(`/chatbot/${chatbot_id}/stop`)

    return response.data
  }
)
