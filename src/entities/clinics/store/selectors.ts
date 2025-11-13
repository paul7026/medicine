import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@app/providers/StoreProvider'

const baseSelector = (state: RootState) => state.clinicsReducer

export const clinicsSelector = createSelector(
  baseSelector,
  ({ clinics, clinicsStatus }) => ({
    clinics,
    status: clinicsStatus,
  })
)
