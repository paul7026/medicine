import { createSlice } from '@reduxjs/toolkit'

import { getUserByIdApi, getUsersApi } from '../api'
import { UsersState } from '../types'

const initialState: UsersState = {
  users: [],
  usersStatus: 'idle',

  userById: null,
  userByIdStatus: 'idle',
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

      .addCase(getUserByIdApi.pending, (state) => {
        state.userByIdStatus = 'pending'
      })
      .addCase(getUserByIdApi.fulfilled, (state, action) => {
        state.userById = action.payload
        state.userByIdStatus = 'succeeded'
      })
      .addCase(getUserByIdApi.rejected, (state) => {
        state.userByIdStatus = 'failed'
      })
  },
})

export const usersReducer = usersSlice.reducer
