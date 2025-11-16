import { ReducerLoadingState } from '@shared/types'

export interface ScheduleConnectionsState {
  scheduleConnections: ScheduleConnection[]
  scheduleConnectionsStatus: ReducerLoadingState

  scheduleConnectionById: ScheduleConnectionById | null
  scheduleConnectionByIdStatus: ReducerLoadingState
}

export interface GetScheduleConnectionsResponse {
  items: {
    id: string
    clinic_name: string
    type: string
  }[]
  total: number
  page: number
  per_page: number
}

export type ScheduleConnection = GetScheduleConnectionsResponse['items'][number]

export interface ScheduleConnectionById {
  id: string
  clinic_id: string
  type: string
  partner_token: string
  user_token: string
  login: string
  password: string
  created_at: string
  updated_at: string
}

export type GetScheduleConnectionByIdResponse = ScheduleConnectionById

export interface EditScheduleConnectionPayload {
  connection_id?: string
  partner_token?: string
  user_token?: string
  login?: string
  password?: string
}

export interface CreateScheduleConnectionPayload {
  type: string
  clinic_id?: string
  partner_token?: string
  user_token?: string
  login?: string
  password?: string
}
