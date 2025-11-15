import { createSlice } from '@reduxjs/toolkit'

import { getChatByIdApi, getChatHistoryApi, getChatsApi } from '../api'
import { ChatsState } from '../types'

const initialState: ChatsState = {
  chats: [],
  chatsStatus: 'idle',

  chatById: null,
  chatByIdStatus: 'idle',

  chatHistory: [],
  chatHistoryStatus: 'idle',
}

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChatsApi.pending, (state) => {
        state.chatsStatus = 'pending'
      })
      .addCase(getChatsApi.fulfilled, (state, action) => {
        state.chats = action.payload.items
        state.chatsStatus = 'succeeded'
      })
      .addCase(getChatsApi.rejected, (state) => {
        state.chatsStatus = 'failed'
      })

      .addCase(getChatByIdApi.pending, (state) => {
        state.chatByIdStatus = 'pending'
      })
      .addCase(getChatByIdApi.fulfilled, (state, action) => {
        state.chatById = action.payload
        state.chatByIdStatus = 'succeeded'
      })
      .addCase(getChatByIdApi.rejected, (state) => {
        state.chatByIdStatus = 'failed'
      })

      .addCase(getChatHistoryApi.pending, (state) => {
        state.chatHistoryStatus = 'pending'
      })
      .addCase(getChatHistoryApi.fulfilled, (state, action) => {
        state.chatHistory = action.payload.chat_history
        state.chatHistoryStatus = 'succeeded'
      })
      .addCase(getChatHistoryApi.rejected, (state) => {
        state.chatHistoryStatus = 'failed'
      })
  },
})

export const chatsReducer = chatsSlice.reducer
