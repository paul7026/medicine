import { ReducerLoadingState } from '@shared/types'

export interface PromptsState {
  prompts: Prompt[]
  promptsStatus: ReducerLoadingState

  promptById: PromptById | null
  promptByIdStatus: ReducerLoadingState
}

export interface Prompt {
  id: string
  clinic_name: string
  name: string
}

export interface GetPromptsResponse {
  items: Prompt[]
  total: number
  page: number
  per_page: number
}

export interface PromptById {
  id: string
  clinic_id: string
  name: string
  content: string
  created_at: string
  updated_at: string
}

export type GetPromptByIdPayload = PromptById

export interface EditPromptPayload {
  prompt_id: string
  name?: string
  content?: string
}

export interface CreatePromptPayload {
  name: string
  content?: string
  clinic_id: string
}
