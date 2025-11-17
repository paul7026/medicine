import { createSlice } from '@reduxjs/toolkit'

import {
  getAllFavoursForFormApi,
  getFavourByIdApi,
  getFavoursApi,
  getSelectedFavoursForFormApi,
} from '../api'
import { FavoursState } from '../types'

const initialState: FavoursState = {
  favours: [],
  favoursStatus: 'idle',

  favourById: null,
  favourByIdStatus: 'idle',

  allFavoursForForm: [],
  allFavoursForFormStatus: 'idle',

  selectedFavoursForForm: [],
  selectedFavoursForFormStatus: 'idle',
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

      .addCase(getAllFavoursForFormApi.pending, (state) => {
        state.allFavoursForFormStatus = 'pending'
      })
      .addCase(getAllFavoursForFormApi.fulfilled, (state, action) => {
        state.allFavoursForForm = action.payload.items
        state.allFavoursForFormStatus = 'succeeded'
      })
      .addCase(getAllFavoursForFormApi.rejected, (state) => {
        state.allFavoursForFormStatus = 'failed'
      })

      .addCase(getSelectedFavoursForFormApi.pending, (state) => {
        state.selectedFavoursForFormStatus = 'pending'
      })
      .addCase(getSelectedFavoursForFormApi.fulfilled, (state, action) => {
        state.selectedFavoursForForm = action.payload.items
        state.selectedFavoursForFormStatus = 'succeeded'
      })
      .addCase(getSelectedFavoursForFormApi.rejected, (state) => {
        state.selectedFavoursForFormStatus = 'failed'
      })
  },
})

export const favoursReducer = favoursSlice.reducer
