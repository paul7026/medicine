import { createSlice } from '@reduxjs/toolkit'

import { getChatByIdApi, getChatsApi } from '../api'
import { ChatsState } from '../types'

const initialState: ChatsState = {
  chats: [],
  chatsStatus: 'idle',

  chatById: null,
  chatByIdStatus: 'idle',
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
  },
})

export const chatsReducer = chatsSlice.reducer
