import { createSlice } from '@reduxjs/toolkit'

import { getPromptByIdApi, getPromptsApi } from '../api'
import { PromptsState } from '../types'

const initialState: PromptsState = {
  prompts: [],
  promptsStatus: 'idle',

  promptById: null,
  promptByIdStatus: 'idle',
}

const promptsSlice = createSlice({
  name: 'prompts',
  initialState,
  reducers: {
    updatePromptContent: (state, action: { payload: { content: string } }) => {
      if (state.promptById) {
        state.promptById.content = action.payload.content
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPromptsApi.pending, (state) => {
        state.promptsStatus = 'pending'
      })
      .addCase(getPromptsApi.fulfilled, (state, action) => {
        state.prompts = action.payload.items
        state.promptsStatus = 'succeeded'
      })
      .addCase(getPromptsApi.rejected, (state) => {
        state.promptsStatus = 'failed'
      })

      .addCase(getPromptByIdApi.pending, (state) => {
        state.promptByIdStatus = 'pending'
      })
      .addCase(getPromptByIdApi.fulfilled, (state, action) => {
        state.promptById = action.payload
        state.promptByIdStatus = 'succeeded'
      })
      .addCase(getPromptByIdApi.rejected, (state) => {
        state.promptByIdStatus = 'failed'
      })
  },
})

export const { updatePromptContent } = promptsSlice.actions
export const promptsReducer = promptsSlice.reducer
