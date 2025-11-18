import { createSlice } from '@reduxjs/toolkit'

import { getEmployeeScheduleApi, getEmployeeScheduleByIdApi } from '../api'
import { EmployeeSchedulesState } from '../types'

const initialState: EmployeeSchedulesState = {
  employeeSchedules: [],
  employeeSchedulesStatus: 'idle',

  employeeScheduleById: null,
  employeeScheduleByIdStatus: 'idle',
}

const employeeSchedulesSlice = createSlice({
  name: 'employeeSchedules',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeScheduleApi.pending, (state) => {
        state.employeeSchedulesStatus = 'pending'
      })
      .addCase(getEmployeeScheduleApi.fulfilled, (state, action) => {
        state.employeeSchedules = action.payload.items
        state.employeeSchedulesStatus = 'succeeded'
      })
      .addCase(getEmployeeScheduleApi.rejected, (state) => {
        state.employeeSchedulesStatus = 'failed'
      })

      .addCase(getEmployeeScheduleByIdApi.pending, (state) => {
        state.employeeScheduleByIdStatus = 'pending'
      })
      .addCase(getEmployeeScheduleByIdApi.fulfilled, (state, action) => {
        state.employeeScheduleById = action.payload
        state.employeeScheduleByIdStatus = 'succeeded'
      })
      .addCase(getEmployeeScheduleByIdApi.rejected, (state) => {
        state.employeeScheduleByIdStatus = 'failed'
      })
  },
})

export const employeeSchedulesReducer = employeeSchedulesSlice.reducer
