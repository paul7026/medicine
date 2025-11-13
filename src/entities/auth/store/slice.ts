import { createSlice } from '@reduxjs/toolkit'

import { cookies } from '@shared/http/cookies'

import { getWhoAmIApi } from '../api'
import { AuthState } from '../types'

const initialState: AuthState = {
  whoAmI: null,
  whoAmIStatus: 'idle',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      cookies.remove('access_token', {
        path: '/',
        secure: false,
      })
      localStorage.clear()
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWhoAmIApi.pending, (state) => {
        state.whoAmIStatus = 'pending'
      })
      .addCase(getWhoAmIApi.fulfilled, (state, action) => {
        state.whoAmIStatus = 'succeeded'
        state.whoAmI = action.payload
      })
      .addCase(getWhoAmIApi.rejected, (state) => {
        state.whoAmIStatus = 'failed'
      })
  },
})

export const { logout } = authSlice.actions
export const authReducer = authSlice.reducer
