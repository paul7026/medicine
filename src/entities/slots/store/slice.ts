import { createSlice } from '@reduxjs/toolkit'

import { getSlotsApi, getSlotsWIthQueryStrApi } from '../api'
import { SlotsState } from '../types'

const initialState: SlotsState = {
  slots: [],
  slotsStatus: 'idle',
  total: 0,
  page: 0,
  per_page: 25,

  slotsWIthQueryStr: [],
  slotsWIthQueryStrStatus: 'idle',
}

const slotsSlice = createSlice({
  name: 'slots',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSlotsApi.pending, (state) => {
        state.slotsStatus = 'pending'
      })
      .addCase(getSlotsApi.fulfilled, (state, action) => {
        state.slots = action.payload.items
        state.total = action.payload.total
        state.page = action.payload.page - 1
        state.per_page = action.payload.per_page
        state.slotsStatus = 'succeeded'
      })
      .addCase(getSlotsApi.rejected, (state) => {
        state.slotsStatus = 'failed'
      })

      .addCase(getSlotsWIthQueryStrApi.pending, (state) => {
        state.slotsWIthQueryStrStatus = 'pending'
      })
      .addCase(getSlotsWIthQueryStrApi.fulfilled, (state, action) => {
        state.slotsWIthQueryStr = action.payload.items
        state.slotsWIthQueryStrStatus = 'succeeded'
      })
      .addCase(getSlotsWIthQueryStrApi.rejected, (state) => {
        state.slotsWIthQueryStrStatus = 'failed'
      })
  },
})

export const slotsReducer = slotsSlice.reducer
