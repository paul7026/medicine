import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetChatByIdPayload, GetChatByIdResponse } from '../types'

export const getChatByIdApi = createThunkWithErrorHandler<
  GetChatByIdResponse,
  GetChatByIdPayload
>('chats/getChatById', async (chat_id) => {
  const response = await $api.get(`/chat/${chat_id}`)

  return response.data
})
