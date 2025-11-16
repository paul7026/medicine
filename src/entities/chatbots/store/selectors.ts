import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@app/providers/StoreProvider'

const baseSelector = (state: RootState) => state.chatbotsReducer

export const chatbotsSelector = createSelector(
  baseSelector,
  ({ chatbots, chatbotsStatus }) => ({
    chatbots,
    status: chatbotsStatus,
  })
)

export const chatbotByIdSelector = createSelector(
  baseSelector,
  ({ chatbotById, chatbotByIdStatus }) => ({
    chatbotById,
    status: chatbotByIdStatus,
  })
)

export const chatbotStatusSelector = createSelector(
  baseSelector,
  ({ chatbotStatusData, getChatbotStatus }) => ({
    chatbotStatusData,
    status: getChatbotStatus,
  })
)

