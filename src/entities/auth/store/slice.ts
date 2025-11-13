import { createSlice } from '@reduxjs/toolkit'

import { loginApi } from '../api'
import { AuthState } from '../types'

const initialState: AuthState = {
  loginStatus: 'idle',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // logout: (state) => {
    //   cookies.remove('token', {
    //     path: '/',
    //     secure: false,
    //   })
    //   localStorage.clear()
    //   state.token = null
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginApi.pending, (state) => {
        state.loginStatus = 'pending'
      })
      .addCase(loginApi.fulfilled, (state) => {
        state.loginStatus = 'succeeded'
      })
      .addCase(loginApi.rejected, (state) => {
        state.loginStatus = 'failed'
      })
  },
})

// export const { logout } = authSlice.actions
export const authReducer = authSlice.reducer
