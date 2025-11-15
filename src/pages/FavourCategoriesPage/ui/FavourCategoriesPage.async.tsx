import { lazy } from 'react'

export const FavourCategoriesPageAsync = lazy(
  () => import('./FavourCategoriesPage')
)
