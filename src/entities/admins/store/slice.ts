import { createSlice } from '@reduxjs/toolkit'

import { getAdminsApi } from '../api'
import { AdminsState } from '../types'

const initialState: AdminsState = {
  admins: [],
  adminsStatus: 'idle',
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
        state.adminsStatus = 'succeeded'
        state.admins = action.payload.items
      })
      .addCase(getAdminsApi.rejected, (state) => {
        state.adminsStatus = 'failed'
      })
  },
})

export const adminsReducer = adminsSlice.reducer
