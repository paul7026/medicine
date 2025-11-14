import { createSlice } from '@reduxjs/toolkit'

import { getFilialByIdApi, getFilialsApi } from '../api'
import { FilialsState } from '../types'

const initialState: FilialsState = {
  filials: [],
  filialsStatus: 'idle',

  filialById: null,
  filialByIdStatus: 'idle',
}

const filialsSlice = createSlice({
  name: 'filials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFilialsApi.pending, (state) => {
        state.filialsStatus = 'pending'
      })
      .addCase(getFilialsApi.fulfilled, (state, action) => {
        state.filials = action.payload.items
        state.filialsStatus = 'succeeded'
      })
      .addCase(getFilialsApi.rejected, (state) => {
        state.filialsStatus = 'failed'
      })

      .addCase(getFilialByIdApi.pending, (state) => {
        state.filialByIdStatus = 'pending'
      })
      .addCase(getFilialByIdApi.fulfilled, (state, action) => {
        state.filialById = action.payload
        state.filialByIdStatus = 'succeeded'
      })
      .addCase(getFilialByIdApi.rejected, (state) => {
        state.filialByIdStatus = 'failed'
      })
  },
})

export const filialsReducer = filialsSlice.reducer
