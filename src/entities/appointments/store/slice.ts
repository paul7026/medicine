import { createSlice } from '@reduxjs/toolkit'

import { getAppointmentByIdApi, getAppointmentsApi } from '../api'
import { AppointmentsState } from '../types'

const initialState: AppointmentsState = {
  appointments: [],
  appointmentsStatus: 'idle',

  appointmentById: null,
  appointmentByIdStatus: 'idle',
}

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAppointmentsApi.pending, (state) => {
        state.appointmentsStatus = 'pending'
      })
      .addCase(getAppointmentsApi.fulfilled, (state, action) => {
        state.appointments = action.payload.items
        state.appointmentsStatus = 'succeeded'
      })
      .addCase(getAppointmentsApi.rejected, (state) => {
        state.appointmentsStatus = 'failed'
      })

      .addCase(getAppointmentByIdApi.pending, (state) => {
        state.appointmentByIdStatus = 'pending'
      })
      .addCase(getAppointmentByIdApi.fulfilled, (state, action) => {
        state.appointmentById = action.payload
        state.appointmentByIdStatus = 'succeeded'
      })
      .addCase(getAppointmentByIdApi.rejected, (state) => {
        state.appointmentByIdStatus = 'failed'
      })
  },
})

export const appointmentsReducer = appointmentsSlice.reducer
