import { ReducerLoadingState } from '@shared/types'

export interface AuthState {
  loginStatus: ReducerLoadingState
}

export interface GetWhoAmIResponse {
  id: string
  username: string
  tenant: string
  clinic_id: string
  is_superuser: boolean
  is_active: boolean
}
