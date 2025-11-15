import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@app/providers/StoreProvider'

const baseSelector = (state: RootState) => state.favoursReducer

export const favoursSelector = createSelector(
  baseSelector,
  ({ favours, favoursStatus }) => ({
    favours,
    status: favoursStatus,
  })
)

export const favourByIdSelector = createSelector(
  baseSelector,
  ({ favourById, favourByIdStatus }) => ({
    favourById,
    status: favourByIdStatus,
  })
)
