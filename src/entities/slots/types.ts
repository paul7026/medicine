import { ReducerLoadingState } from '@shared/types'

export interface SlotsState {
  slots: Slot[]
  slotsStatus: ReducerLoadingState
  total: number
  page: number
  per_page: number
}

export interface GetSlotsPayload {
  page?: number
  per_page?: number
  clinic_id?: string
  filial_id?: string
  employee_id?: string
  start_time?: string
  end_time?: string
  format?: string
  is_available?: boolean
}

export interface GetSlotsResponse {
  items: {
    id: string
    clinic_id: string
    filial_id: string
    employee_id: string
    start_time: string
    end_time: string
    format: string
    is_available: boolean
  }[]
  total: number
  page: number
  per_page: number
}

export type Slot = GetSlotsResponse['items'][number]

export interface DeleteSlotsPayload {
  from_date: string
  to_date: string
  clinic_id?: string
}
