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

export const allFavoursForFormSelector = createSelector(
  baseSelector,
  ({ allFavoursForForm, allFavoursForFormStatus }) => ({
    allFavoursForForm,
    status: allFavoursForFormStatus,
  })
)

export const selectedFavoursForFormSelector = createSelector(
  baseSelector,
  ({ selectedFavoursForForm, selectedFavoursForFormStatus }) => ({
    selectedFavoursForForm,
    status: selectedFavoursForFormStatus,
  })
)
