import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@app/providers/StoreProvider'

const baseSelector = (state: RootState) => state.adminsReducer

export const adminsSelector = createSelector(
  baseSelector,
  ({ admins, adminsStatus }) => ({
    admins,
    status: adminsStatus,
  })
)
