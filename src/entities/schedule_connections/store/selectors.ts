import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@app/providers/StoreProvider'

const baseSelector = (state: RootState) => state.scheduleConnectionsReducer

export const scheduleConnectionsSelector = createSelector(
  baseSelector,
  ({ scheduleConnections, scheduleConnectionsStatus }) => ({
    scheduleConnections,
    status: scheduleConnectionsStatus,
  })
)

export const scheduleConnectionByIdSelector = createSelector(
  baseSelector,
  ({ scheduleConnectionById, scheduleConnectionByIdStatus }) => ({
    scheduleConnectionById,
    status: scheduleConnectionByIdStatus,
  })
)
