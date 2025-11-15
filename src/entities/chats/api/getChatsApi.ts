import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { GetChatsResponse } from '../types'

export const getChatsApi = createThunkWithErrorHandler<GetChatsResponse, void>(
  'chats/getChats',
  async () => {
    const response = await $api.get('/chat/list')

    return response.data
  }
)
