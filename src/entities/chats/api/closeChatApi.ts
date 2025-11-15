import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

export const closeChatApi = createThunkWithErrorHandler<void, string>(
  'chats/closeChat',
  async (chat_id) => {
    const response = await $api.post(`/chat/${chat_id}/close`, {})

    return response.data
  }
)
