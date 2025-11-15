import { ReducerLoadingState } from '@shared/types'

export interface AdminsState {
  admins: Admin[]
  adminsStatus: ReducerLoadingState
}

export interface GetAdminsResponse {
  items: {
    username: string
    tenant: string
    clinic_id: string
    is_superuser: true
    id: string
    created_at: string
    updated_at: string
  }[]
  total: number
  page: number
  per_page: number
}

export type Admin = GetAdminsResponse['items'][number]

export interface CreateAdminApiPayload {
  username: string
  password: string
  tenant: string
  is_superuser: boolean
  clinic_id?: string
}

export interface EditAdminPayload {
  admin_id: string
  username: string
  password: string
  tenant?: string
  clinic_id?: string
  is_superuser: boolean
}
