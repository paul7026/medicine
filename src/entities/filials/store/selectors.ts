import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@app/providers/StoreProvider'

const baseSelector = (state: RootState) => state.filialsReducer

export const filialsSelector = createSelector(
  baseSelector,
  ({ filials, filialsStatus }) => ({
    filials,
    status: filialsStatus,
  })
)
