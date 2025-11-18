import { createSlice } from '@reduxjs/toolkit'

import {
  getAllFilialsForFormApi,
  getFilialByIdApi,
  getFilialsApi,
  getSelectedFilialsForFormApi,
} from '../api'
import { FilialsState } from '../types'

const initialState: FilialsState = {
  filials: [],
  filialsStatus: 'idle',

  filialById: null,
  filialByIdStatus: 'idle',

  selectedFilialsForForm: [],
  selectedFilialsForFormStatus: 'idle',

  allFilialsForForm: [],
  allFilialsForFormStatus: 'idle',
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

      .addCase(getSelectedFilialsForFormApi.pending, (state) => {
        state.selectedFilialsForFormStatus = 'pending'
      })
      .addCase(getSelectedFilialsForFormApi.fulfilled, (state, action) => {
        state.selectedFilialsForForm = action.payload.items
        state.selectedFilialsForFormStatus = 'succeeded'
      })
      .addCase(getSelectedFilialsForFormApi.rejected, (state) => {
        state.selectedFilialsForFormStatus = 'failed'
      })

      .addCase(getAllFilialsForFormApi.pending, (state) => {
        state.allFilialsForFormStatus = 'pending'
      })
      .addCase(getAllFilialsForFormApi.fulfilled, (state, action) => {
        state.allFilialsForForm = action.payload.items
        state.allFilialsForFormStatus = 'succeeded'
      })
      .addCase(getAllFilialsForFormApi.rejected, (state) => {
        state.allFilialsForFormStatus = 'failed'
      })
  },
})

export const filialsReducer = filialsSlice.reducer
