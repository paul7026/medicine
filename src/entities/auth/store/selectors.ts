import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@app/providers/StoreProvider'

const authBaseSelector = (state: RootState) => state.authReducer

export const whoAmISelector = createSelector(
  authBaseSelector,
  ({ whoAmI, whoAmIStatus }) => ({
    whoAmI,
    status: whoAmIStatus,
  })
)
