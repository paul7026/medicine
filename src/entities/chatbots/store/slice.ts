import { createSlice } from '@reduxjs/toolkit'

import { getChatbotByIdApi, getChatbotsApi } from '../api'
import { ChatbotsState } from '../types'

const initialState: ChatbotsState = {
  chatbots: [],
  chatbotsStatus: 'idle',

  chatbotById: null,
  chatbotByIdStatus: 'idle',
}

const chatbotsSlice = createSlice({
  name: 'chatbots',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChatbotsApi.pending, (state) => {
        state.chatbotsStatus = 'pending'
      })
      .addCase(getChatbotsApi.fulfilled, (state, action) => {
        state.chatbots = action.payload.items
        state.chatbotsStatus = 'succeeded'
      })
      .addCase(getChatbotsApi.rejected, (state) => {
        state.chatbotsStatus = 'failed'
      })

      .addCase(getChatbotByIdApi.pending, (state) => {
        state.chatbotByIdStatus = 'pending'
      })
      .addCase(getChatbotByIdApi.fulfilled, (state, action) => {
        state.chatbotById = action.payload
        state.chatbotByIdStatus = 'succeeded'
      })
      .addCase(getChatbotByIdApi.rejected, (state) => {
        state.chatbotByIdStatus = 'failed'
      })
  },
})

export const chatbotsReducer = chatbotsSlice.reducer
