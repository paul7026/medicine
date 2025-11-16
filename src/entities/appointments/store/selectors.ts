import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@app/providers/StoreProvider'

const baseSelector = (state: RootState) => state.appointmentsReducer

export const appointmentsSelector = createSelector(
  baseSelector,
  ({ appointments, appointmentsStatus }) => ({
    appointments,
    status: appointmentsStatus,
  })
)

export const appointmentByIdSelector = createSelector(
  baseSelector,
  ({ appointmentById, appointmentByIdStatus }) => ({
    appointmentById,
    status: appointmentByIdStatus,
  })
)
