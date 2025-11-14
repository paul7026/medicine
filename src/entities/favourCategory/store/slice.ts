import { createSlice } from '@reduxjs/toolkit'

import { getFavourCategoriesApi } from '../api'
import { FavourCategoriesState } from '../types'

const initialState: FavourCategoriesState = {
  favourCategories: [],
  favourCategoriesStatus: 'idle',
}

const favourCategoriesSlice = createSlice({
  name: 'favourCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavourCategoriesApi.pending, (state) => {
        state.favourCategoriesStatus = 'pending'
      })
      .addCase(getFavourCategoriesApi.fulfilled, (state, action) => {
        state.favourCategories = action.payload.items
        state.favourCategoriesStatus = 'succeeded'
      })
      .addCase(getFavourCategoriesApi.rejected, (state) => {
        state.favourCategoriesStatus = 'failed'
      })
  },
})

export const favourCategoriesReducer = favourCategoriesSlice.reducer
