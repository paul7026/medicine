import { ReducerLoadingState } from '@shared/types'

export interface ChatsState {
  chats: Chat[]
  chatsStatus: ReducerLoadingState

  chatById: ChatById | null
  chatByIdStatus: ReducerLoadingState

  chatHistory: ChatHistoryItem[]
  chatHistoryStatus: ReducerLoadingState
}

export interface GetChatsResponse {
  items: {
    id: string
    name: string
    channel: string
    current_intent: number
    last_message_preview: string
    is_active: boolean
  }[]
  total: number
  page: number
  per_page: number
}

export type Chat = GetChatsResponse['items'][number]

export interface ChatHistoryItem {
  id: string
  role: string
  intent: number
  message: string
  meta?: {
    additionalProp1?: object
    [key: string]: unknown
  }
  created_at: string
}

export interface ChatById {
  id: string
  user_id: string
  channel: string
  current_intent: string
  previous_intent: number
  is_active: boolean
  created_at: string
  updated_at: string
  chat_history: ChatHistoryItem[]
}

export type GetChatByIdResponse = ChatById

export type GetChatByIdPayload = string

export interface GetChatHistoryResponse {
  chat_history: ChatHistoryItem[]
}

export type GetChatHistoryPayload = string

export interface EditChatPayload {
  chat_id: string
  message: string
  meta?: {
    [key: string]: unknown
  }
}
