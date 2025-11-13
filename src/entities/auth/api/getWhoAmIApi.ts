import { createAsyncThunk } from '@reduxjs/toolkit'

import $api from '@shared/http/api.config'

import { GetWhoAmIResponse } from '../types'

export const getWhoAmIApi = createAsyncThunk<GetWhoAmIResponse, void>(
  'auth/getWhoAmI',
  async (_, { rejectWithValue }) => {
    try {
      const response = await $api.get<GetWhoAmIResponse>('/auth/who-am-i')

      localStorage.setItem('tenant', JSON.stringify(response.data))

      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)
