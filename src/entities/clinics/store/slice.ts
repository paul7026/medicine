import { createSlice } from '@reduxjs/toolkit'

import { getClinicsApi } from '../api'
import { ClinicsState } from '../types'

const initialState: ClinicsState = {
  clinics: [],
  clinicsStatus: 'idle',
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
  },
})

export const clinicsReducer = clinicsSlice.reducer
