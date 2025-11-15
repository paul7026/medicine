import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

export const returnChatApi = createThunkWithErrorHandler<void, string>(
  'chats/returnChat',
  async (chat_id) => {
    const response = await $api.post(`/chat/${chat_id}/return`, {})

    return response.data
  }
)
