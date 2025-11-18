import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@app/providers/StoreProvider'

const baseSelector = (state: RootState) => state.employeeSchedulesReducer

export const employeeSchedulesSelector = createSelector(
  baseSelector,
  ({ employeeSchedules, employeeSchedulesStatus }) => ({
    employeeSchedules,
    status: employeeSchedulesStatus,
  })
)

export const employeeScheduleByIdSelector = createSelector(
  baseSelector,
  ({ employeeScheduleById, employeeScheduleByIdStatus }) => ({
    employeeScheduleById,
    status: employeeScheduleByIdStatus,
  })
)
