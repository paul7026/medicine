import { createSlice } from '@reduxjs/toolkit'

import { getEmployeeByIdApi, getEmployeesApi } from '../api'
import { EmployeesState } from '../types'

const initialState: EmployeesState = {
  employees: [],
  employeesStatus: 'idle',

  employeeById: null,
  employeeByIdStatus: 'idle',
}

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeesApi.pending, (state) => {
        state.employeesStatus = 'pending'
      })
      .addCase(getEmployeesApi.fulfilled, (state, action) => {
        state.employees = action.payload.items
        state.employeesStatus = 'succeeded'
      })
      .addCase(getEmployeesApi.rejected, (state) => {
        state.employeesStatus = 'failed'
      })

      .addCase(getEmployeeByIdApi.pending, (state) => {
        state.employeeByIdStatus = 'pending'
      })
      .addCase(getEmployeeByIdApi.fulfilled, (state, action) => {
        state.employeeById = action.payload
        state.employeeByIdStatus = 'succeeded'
      })
      .addCase(getEmployeeByIdApi.rejected, (state) => {
        state.employeeByIdStatus = 'failed'
      })
  },
})

export const employeesReducer = employeesSlice.reducer
