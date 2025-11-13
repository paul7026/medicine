import { createSlice } from '@reduxjs/toolkit'

import { getFilialsApi } from '../api'
import { FilialsState } from '../types'

const initialState: FilialsState = {
  filials: [],
  filialsStatus: 'idle',
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
  },
})

export const filialsReducer = filialsSlice.reducer
