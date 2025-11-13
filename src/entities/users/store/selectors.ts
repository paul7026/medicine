import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@app/providers/StoreProvider'

const baseSelector = (state: RootState) => state.usersReducer

export const usersSelector = createSelector(
  baseSelector,
  ({ users, usersStatus }) => ({
    users,
    status: usersStatus,
  })
)
