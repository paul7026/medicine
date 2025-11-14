import { createSlice } from '@reduxjs/toolkit'

import { getFavourByIdApi, getFavoursApi } from '../api'
import { FavoursState } from '../types'

const initialState: FavoursState = {
  favours: [],
  favoursStatus: 'idle',

  favourById: null,
  favourByIdStatus: 'idle',
}

const favoursSlice = createSlice({
  name: 'favours',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavoursApi.pending, (state) => {
        state.favoursStatus = 'pending'
      })
      .addCase(getFavoursApi.fulfilled, (state, action) => {
        state.favours = action.payload.items
        state.favoursStatus = 'succeeded'
      })
      .addCase(getFavoursApi.rejected, (state) => {
        state.favoursStatus = 'failed'
      })

      .addCase(getFavourByIdApi.pending, (state) => {
        state.favourByIdStatus = 'pending'
      })
      .addCase(getFavourByIdApi.fulfilled, (state, action) => {
        state.favourById = action.payload
        state.favourByIdStatus = 'succeeded'
      })
      .addCase(getFavourByIdApi.rejected, (state) => {
        state.favourByIdStatus = 'failed'
      })
  },
})

export const favoursReducer = favoursSlice.reducer
