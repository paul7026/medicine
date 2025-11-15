import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@app/providers/StoreProvider'

const baseSelector = (state: RootState) => state.adminsReducer

export const adminsSelector = createSelector(
  baseSelector,
  ({ admins, adminsStatus, total, page, per_page }) => ({
    admins,
    status: adminsStatus,
    total,
    page,
    per_page,
  })
)
