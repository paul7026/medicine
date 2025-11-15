import { createSlice } from '@reduxjs/toolkit'

import { getScheduleConnectionByIdApi, getScheduleConnectionsApi } from '../api'
import { ScheduleConnectionsState } from '../types'

const initialState: ScheduleConnectionsState = {
  scheduleConnections: [],
  scheduleConnectionsStatus: 'idle',

  scheduleConnectionById: null,
  scheduleConnectionByIdStatus: 'idle',
}

const scheduleConnectionsSlice = createSlice({
  name: 'scheduleConnections',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getScheduleConnectionsApi.pending, (state) => {
        state.scheduleConnectionsStatus = 'pending'
      })
      .addCase(getScheduleConnectionsApi.fulfilled, (state, action) => {
        state.scheduleConnections = action.payload.items
        state.scheduleConnectionsStatus = 'succeeded'
      })
      .addCase(getScheduleConnectionsApi.rejected, (state) => {
        state.scheduleConnectionsStatus = 'failed'
      })

      .addCase(getScheduleConnectionByIdApi.pending, (state) => {
        state.scheduleConnectionByIdStatus = 'pending'
      })
      .addCase(getScheduleConnectionByIdApi.fulfilled, (state, action) => {
        state.scheduleConnectionById = action.payload
        state.scheduleConnectionByIdStatus = 'succeeded'
      })
      .addCase(getScheduleConnectionByIdApi.rejected, (state) => {
        state.scheduleConnectionByIdStatus = 'failed'
      })
  },
})

export const scheduleConnectionsReducer = scheduleConnectionsSlice.reducer
