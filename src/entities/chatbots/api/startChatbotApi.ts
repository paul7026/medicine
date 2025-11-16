import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

export const startChatbotApi = createThunkWithErrorHandler<void, string>(
  'chatbots/startChatbot',
  async (chatbot_id) => {
    const response = await $api.post(`/chatbot/${chatbot_id}/start`)

    return response.data
  }
)
