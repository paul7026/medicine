import { ReducerLoadingState } from '@shared/types'

export interface FavourCategoriesState {
  favourCategories: GetFavourCategoriesResponse['items']
  favourCategoriesStatus: ReducerLoadingState
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
