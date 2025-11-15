import { ReducerLoadingState } from '@shared/types'

export interface ChatbotsState {
  chatbots: GetChatbotsResponse['items']
  chatbotsStatus: ReducerLoadingState

  chatbotById: GetChatbotByIdResponse | null
  chatbotByIdStatus: ReducerLoadingState
}

export interface GetChatbotsResponse {
  items: {
    id: string
    platform: string
    clinic_name: string
  }[]
  total: number
  page: number
  per_page: number
}

export interface GetChatbotByIdResponse {
  id: string
  clinic_id: string
  platform: string
  bot_token: string
  api_key: string
  webhook_url: string
  config: {
    additionalProp1: object
  }
  created_at: string
  updated_at: string
}

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[]

export interface EditChatbotPayload {
  chatbot_id: string
  api_key: string
  webhook_url: string
  config: JsonValue
}

export interface CreateChatbotPayload {
  platform: string
  bot_token: string
  api_key: string
  webhook_url: string
  config: JsonValue
  clinic_id: string
}
