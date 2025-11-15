import { createSlice } from '@reduxjs/toolkit'

import { getAdminsApi } from '../api'
import { AdminsState } from '../types'

const initialState: AdminsState = {
  admins: [],
  adminsStatus: 'idle',
  total: 0,
  page: 0,
  per_page: 25,
}

const adminsSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminsApi.pending, (state) => {
        state.adminsStatus = 'pending'
      })
      .addCase(getAdminsApi.fulfilled, (state, action) => {
        state.admins = action.payload.items
        state.total = action.payload.total
        state.page = action.payload.page - 1
        state.per_page = action.payload.per_page
        state.adminsStatus = 'succeeded'
      })
      .addCase(getAdminsApi.rejected, (state) => {
        state.adminsStatus = 'failed'
      })
  },
})

export const adminsReducer = adminsSlice.reducer
