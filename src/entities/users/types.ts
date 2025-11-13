import { ReducerLoadingState } from '@shared/types'

export interface UsersState {
  users: GetUsersResponse['items']
  usersStatus: ReducerLoadingState
}

export interface GetUsersResponse {
  items: {
    id: string
    name: string
    tenant: string
    clinic_id: string
    is_active: boolean
  }[]
  total: number
  page: number
  per_page: number
}
