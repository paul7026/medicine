import { ReducerLoadingState } from '@shared/types'

export interface ClinicsState {
  clinics: GetClinicsResponse['items']
  clinicsStatus: ReducerLoadingState
}

export interface GetClinicsResponse {
  items: {
    id: string
    title: string
    legal_name: string
    managed_by: string
  }[]
  total: number
  page: number
  per_page: number
}
