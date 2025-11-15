import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@app/providers/StoreProvider'

const baseSelector = (state: RootState) => state.documentsReducer

export const documentsSelector = createSelector(
  baseSelector,
  ({ documents, documentsStatus }) => ({
    documents,
    status: documentsStatus,
  })
)

export const documentByIdSelector = createSelector(
  baseSelector,
  ({ documentById, documentByIdStatus }) => ({
    documentById,
    status: documentByIdStatus,
  })
)
