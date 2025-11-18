import { lazy } from 'react'

export const EmployeeSchedulePageAsync = lazy(
  () => import('./EmployeeSchedulePage')
)
