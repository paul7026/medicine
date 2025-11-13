import { ReducerLoadingState } from '@shared/types'

export interface UsersState {
  users: GetUsersResponse['items']
  usersStatus: ReducerLoadingState

  userById: UserById | null
  userByIdStatus: ReducerLoadingState
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

export type User = GetUsersResponse['items'][number]

export interface UserById {
  id: string
  external_id: string
  tenant: string
  clinic_id: string
  name: string
  country: string
  date_of_birth: string
  height: string
  weight: string
  gender: string
  goal: string
  custom_goal: string
  complaints: string[]
  custom_complaint: string
  lifestyle: {
    additionalProp1: object
  }
  contraindications: {
    additionalProp1: object
  }
  is_onboarded: boolean
}

export type GetUserByIdResponse = UserById

export interface EditUserPayload {
  user_id: string
  name: string
  country: string
  date_of_birth: string
  height: number
  weight: number
  gender: string
  goal: string
  custom_goal: string
  complaints: string[]
  custom_complaint: string
  lifestyle?: {
    additionalProp1: object
  }
  contraindications?: {
    additionalProp1: object
  }
  is_onboarded: boolean
}
