import { createSlice } from '@reduxjs/toolkit'

import { getClinicByIdApi, getClinicsApi } from '../api'
import { ClinicsState } from '../types'

const initialState: ClinicsState = {
  clinics: [],
  clinicsStatus: 'idle',

  clinicById: null,
  clinicByIdStatus: 'idle',
}

const clinicsSlice = createSlice({
  name: 'clinics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClinicsApi.pending, (state) => {
        state.clinicsStatus = 'pending'
      })
      .addCase(getClinicsApi.fulfilled, (state, action) => {
        state.clinics = action.payload.items
        state.clinicsStatus = 'succeeded'
      })
      .addCase(getClinicsApi.rejected, (state) => {
        state.clinicsStatus = 'failed'
      })

      .addCase(getClinicByIdApi.pending, (state) => {
        state.clinicByIdStatus = 'pending'
      })
      .addCase(getClinicByIdApi.fulfilled, (state, action) => {
        state.clinicById = action.payload
        state.clinicByIdStatus = 'succeeded'
      })
      .addCase(getClinicByIdApi.rejected, (state) => {
        state.clinicByIdStatus = 'failed'
      })
  },
})

export const clinicsReducer = clinicsSlice.reducer
