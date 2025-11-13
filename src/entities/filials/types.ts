import { ReducerLoadingState } from '@shared/types'

export interface FilialsState {
  filials: GetFilialsResponse['items']
  filialsStatus: ReducerLoadingState
}

export interface GetFilialsResponse {
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
