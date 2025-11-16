import { ReducerLoadingState } from '@shared/types'

export interface FavourCategoriesState {
  favourCategories: GetFavourCategoriesResponse['items']
  favourCategoriesStatus: ReducerLoadingState

  favourCategoryById: GetFavourCategoryByIdResponse | null
  favourCategoryByIdStatus: ReducerLoadingState
}

export interface GetFavourCategoriesResponse {
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

export interface EditFavourCategoryPayload {
  category_id: string
  title: string
  description?: string
}

export interface CreateFavourCategoryPayload {
  clinic_id?: string
  title: string
  description?: string
}

export interface GetFavourCategoryByIdResponse {
  id: string
  clinic_id: string
  title: string
  description: string
  is_default: boolean
  created_at: string
  updated_at: string
}
