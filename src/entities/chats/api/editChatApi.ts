import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { EditChatPayload } from '../types'

export const editChatApi = createThunkWithErrorHandler<void, EditChatPayload>(
  'chats/editChat',
  async ({ chat_id, ...payload }) => {
    const response = await $api.post(`/chat/${chat_id}/message`, {
      ...payload,
    })

    return response.data
  }
)
