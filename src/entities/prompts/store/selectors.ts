import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@app/providers/StoreProvider'

const baseSelector = (state: RootState) => state.promptsReducer

export const promptsSelector = createSelector(
  baseSelector,
  ({ prompts, promptsStatus }) => ({
    prompts,
    status: promptsStatus,
  })
)

export const promptByIdSelector = createSelector(
  baseSelector,
  ({ promptById, promptByIdStatus }) => ({
    promptById,
    status: promptByIdStatus,
  })
)
