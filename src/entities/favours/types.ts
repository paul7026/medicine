import { ReducerLoadingState } from '@shared/types'

export interface FavoursState {
  favours: GetFavoursResponse['items']
  favoursStatus: ReducerLoadingState

  favourById: GetFavourByIdResponse | null
  favourByIdStatus: ReducerLoadingState

  allFavoursForForm: GetFavoursResponse['items']
  allFavoursForFormStatus: ReducerLoadingState

  selectedFavoursForForm: GetFavoursResponse['items']
  selectedFavoursForFormStatus: ReducerLoadingState
}

export interface GetFavoursResponse {
  items: {
    id: string
    title: string
    clinic_name: string
    is_default: boolean
  }[]
  total: number
  page: number
  per_page: number
}

export interface GetFavourByIdResponse {
  id: string
  clinic_id: string
  title: string
  favour_category_id: string
  favour_category_name: string
  comment: string
  duration: number
  online_switch_on: boolean
  price: number
  currency: string
  filials: [
    {
      id: string
      name: string
    },
  ]
  employees: [
    {
      id: string
      name: string
    },
  ]
  created_at: string
  updated_at: string
}

export interface EditFavourPayload {
  favour_id: string
  title: string
  favour_category_id: string
  comment?: string
  duration?: number
  online_switch_on?: boolean
  price?: number
  currency?: string
}

export interface CreateFavourPayload {
  title: string
  favour_category_id: string
  comment?: string
  duration?: number
  online_switch_on?: boolean
  price?: number
  currency?: string
  clinic_id?: string
}
