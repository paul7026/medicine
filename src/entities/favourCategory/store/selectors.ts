import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@app/providers/StoreProvider'

const baseSelector = (state: RootState) => state.favourCategoriesReducer

export const favourCategoriesSelector = createSelector(
  baseSelector,
  ({ favourCategories, favourCategoriesStatus }) => ({
    favourCategories,
    status: favourCategoriesStatus,
  })
)

export const favourCategoryByIdSelector = createSelector(
  baseSelector,
  ({ favourCategoryById, favourCategoryByIdStatus }) => ({
    favourCategoryById,
    status: favourCategoryByIdStatus,
  })
)
