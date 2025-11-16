import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@app/providers/StoreProvider'

const baseSelector = (state: RootState) => state.slotsReducer

export const slotsSelector = createSelector(
  baseSelector,
  ({ slots, slotsStatus, total, page, per_page }) => ({
    slots,
    status: slotsStatus,
    total,
    page,
    per_page,
  })
)

export const slotsWIthQueryStrSelector = createSelector(
  baseSelector,
  ({ slotsWIthQueryStr, slotsWIthQueryStrStatus }) => ({
    slotsWIthQueryStr,
    status: slotsWIthQueryStrStatus,
  })
)
