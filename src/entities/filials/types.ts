import { ReducerLoadingState } from '@shared/types'

export interface FilialsState {
  filials: GetFilialsResponse['items']
  filialsStatus: ReducerLoadingState

  filialById: FilialById | null
  filialByIdStatus: ReducerLoadingState
}

export interface GetFilialsResponse {
  items: {
    id: string
    name: string
    clinic_title: string
    address: string
  }[]
  total: number
  page: number
  per_page: number
}

export interface FilialById {
  id: string
  external_id: string
  clinic_id: string
  name: string
  timezone: string
  address: string
  address_data: string
  phones: string
  description: string
  social_media: string
  email: string
  created_at: string
  updated_at: string
}

export type GetFilialByIdPayload = FilialById

export interface EditFilialPayload {
  filial_id: string
  external_id?: string
  clinic_id?: string
  name?: string
  timezone?: string
  address?: string
  address_data?: string
  phones?: string
  description?: string
  social_media?: string
  email?: string
}

export interface CreateFilialPayload {
  name: string
  address: string
  timezone?: string
  address_data?: string
  phones?: string
  description?: string
  social_media?: string
  email?: string
  clinic_id?: string
}

export interface FavourToFilialPayload {
  filials: string[]
  favour_id: string
}

export interface FavourToEmployeePayload {
  employees: string[]
  favour_id: string
}

export interface PostFilialToFavourPayload {
  favours: string[]
  filial_id: string
}

export interface PostFilialToEmployeePayload {
  employees: string[]
  filial_id: string
}
