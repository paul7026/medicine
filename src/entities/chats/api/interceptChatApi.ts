import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

export const interceptChatApi = createThunkWithErrorHandler<void, string>(
  'chats/interceptChat',
  async (chat_id) => {
    const response = await $api.post(`/chat/${chat_id}/intercept`, {})

    return response.data
  }
)
