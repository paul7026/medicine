import { createSlice } from '@reduxjs/toolkit'

import { getFavourCategoriesApi, getFavourCategoryByIdApi } from '../api'
import { FavourCategoriesState } from '../types'

const initialState: FavourCategoriesState = {
  favourCategories: [],
  favourCategoriesStatus: 'idle',

  favourCategoryById: null,
  favourCategoryByIdStatus: 'idle',
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

      .addCase(getFavourCategoryByIdApi.pending, (state) => {
        state.favourCategoryByIdStatus = 'pending'
      })
      .addCase(getFavourCategoryByIdApi.fulfilled, (state, action) => {
        state.favourCategoryById = action.payload
        state.favourCategoryByIdStatus = 'succeeded'
      })
      .addCase(getFavourCategoryByIdApi.rejected, (state) => {
        state.favourCategoryByIdStatus = 'failed'
      })
  },
})

export const favourCategoriesReducer = favourCategoriesSlice.reducer
