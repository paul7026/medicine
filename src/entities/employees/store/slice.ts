import { createSlice } from '@reduxjs/toolkit'

import {
  getAllEmployeesForFormApi,
  getEmployeeByIdApi,
  getEmployeesApi,
  getSelectedEmployeesForFormApi,
} from '../api'
import { EmployeesState } from '../types'

const initialState: EmployeesState = {
  employees: [],
  employeesStatus: 'idle',

  employeeById: null,
  employeeByIdStatus: 'idle',

  allEmployeesForForm: [],
  allEmployeesForFormStatus: 'idle',

  selectedEmployeesForForm: [],
  selectedEmployeesForFormStatus: 'idle',
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

      .addCase(getAllEmployeesForFormApi.pending, (state) => {
        state.allEmployeesForFormStatus = 'pending'
      })
      .addCase(getAllEmployeesForFormApi.fulfilled, (state, action) => {
        state.allEmployeesForForm = action.payload.items
        state.allEmployeesForFormStatus = 'succeeded'
      })

      .addCase(getSelectedEmployeesForFormApi.pending, (state) => {
        state.selectedEmployeesForFormStatus = 'pending'
      })
      .addCase(getSelectedEmployeesForFormApi.fulfilled, (state, action) => {
        state.selectedEmployeesForForm = action.payload.items
        state.selectedEmployeesForFormStatus = 'succeeded'
      })
  },
})

export const employeesReducer = employeesSlice.reducer
