import { createSlice } from '@reduxjs/toolkit'

import { getDocumentByIdApi, getDocumentsApi } from '../api'
import { DocumentsState } from '../types'

const initialState: DocumentsState = {
  documents: [],
  documentsStatus: 'idle',

  documentById: null,
  documentByIdStatus: 'idle',
}

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDocumentsApi.pending, (state) => {
        state.documentsStatus = 'pending'
      })
      .addCase(getDocumentsApi.fulfilled, (state, action) => {
        state.documents = action.payload.items
        state.documentsStatus = 'succeeded'
      })
      .addCase(getDocumentsApi.rejected, (state) => {
        state.documentsStatus = 'failed'
      })

      .addCase(getDocumentByIdApi.pending, (state) => {
        state.documentByIdStatus = 'pending'
      })
      .addCase(getDocumentByIdApi.fulfilled, (state, action) => {
        state.documentById = action.payload
        state.documentByIdStatus = 'succeeded'
      })
      .addCase(getDocumentByIdApi.rejected, (state) => {
        state.documentByIdStatus = 'failed'
      })
  },
})

export const documentsReducer = documentsSlice.reducer
