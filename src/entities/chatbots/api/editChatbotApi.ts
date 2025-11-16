import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import $api from '@shared/http/api.config'

import { EditChatbotPayload } from '../types'

export const editChatbotApi = createThunkWithErrorHandler<
  void,
  EditChatbotPayload
>('chatbots/editChatbot', async ({ chatbot_id, ...payload }) => {
  const response = await $api.patch(`/chatbot/${chatbot_id}`, {
    ...payload,
  })

  return response.data
})
