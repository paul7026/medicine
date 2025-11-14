import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@app/providers/StoreProvider'

const baseSelector = (state: RootState) => state.employeesReducer

export const employeesSelector = createSelector(
  baseSelector,
  ({ employees, employeesStatus }) => ({
    employees,
    status: employeesStatus,
  })
)

export const employeeByIdSelector = createSelector(
  baseSelector,
  ({ employeeById, employeeByIdStatus }) => ({
    employeeById,
    status: employeeByIdStatus,
  })
)
