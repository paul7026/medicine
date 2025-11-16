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
    workout_frequency?: string
    physical_activities?: string[]
    custom_activities?: string[]
    eating_habits?: string[]
    custom_habits?: string
    meal_frequency?: string
    water_intake?: string
    stress_level?: string
  }
  contraindications: {
    allergies?: string[]
    custom_allergies?: string[]
    chronic_conditions?: string[]
    custom_conditions?: string[]
    health_conditions?: string[]
    medication_restrictions?: string[]
    custom_restrictions?: string[]
    ethical_choices?: string[]
    custom_features?: string[]
  }
  is_onboarded: boolean
}

export type GetUserByIdResponse = UserById

export interface EditUserPayload {
  user_id?: string
  name?: string
  country?: string
  date_of_birth: string | null
  height?: number
  weight?: number
  gender?: string
  goal?: string
  custom_goal?: string
  complaints?: string[]
  custom_complaint?: string
  lifestyle?: UserById['lifestyle']
  contraindications?: UserById['contraindications']
  is_onboarded?: boolean
}
