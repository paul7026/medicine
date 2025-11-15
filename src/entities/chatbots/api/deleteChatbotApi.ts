import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

export const deleteChatbotApi = createThunkWithErrorHandler<void, string>(
  'chatbots/deleteChatbotApi',
  async (chatbot_id) => {
    const response = await $api.delete(`/chatbot/${chatbot_id}`, {})

    return response.data
  }
)
