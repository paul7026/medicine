import { ReducerLoadingState } from '@shared/types'

export interface AuthState {
  whoAmI: GetWhoAmIResponse | null
  whoAmIStatus: ReducerLoadingState
}

export interface GetWhoAmIResponse {
  id: string
  username: string
  tenant: string
  clinic_id: string
  is_superuser: boolean
  is_active: boolean
}
