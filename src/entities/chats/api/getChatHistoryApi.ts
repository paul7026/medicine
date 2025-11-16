import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetChatHistoryPayload, GetChatHistoryResponse } from '../types'

export const getChatHistoryApi = createThunkWithErrorHandler<
  GetChatHistoryResponse,
  GetChatHistoryPayload
>('chats/getChatHistory', async (chat_id) => {
  const response = await $api.get(`/chat/${chat_id}/history`)

  return response.data
})
