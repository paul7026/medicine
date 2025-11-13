import { createSlice } from '@reduxjs/toolkit'

import { getUsersApi } from '../api'
import { UsersState } from '../types'

const initialState: UsersState = {
  users: [],
  usersStatus: 'idle',
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersApi.pending, (state) => {
        state.usersStatus = 'pending'
      })
      .addCase(getUsersApi.fulfilled, (state, action) => {
        state.users = action.payload.items
        state.usersStatus = 'succeeded'
      })
      .addCase(getUsersApi.rejected, (state) => {
        state.usersStatus = 'failed'
      })
  },
})

export const usersReducer = usersSlice.reducer
