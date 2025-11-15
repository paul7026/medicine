import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@app/providers/StoreProvider'

const baseSelector = (state: RootState) => state.chatsReducer

export const chatsSelector = createSelector(
  baseSelector,
  ({ chats, chatsStatus }) => ({
    chats,
    status: chatsStatus,
  })
)

export const chatByIdSelector = createSelector(
  baseSelector,
  ({ chatById, chatByIdStatus }) => ({
    chatById,
    status: chatByIdStatus,
  })
)
