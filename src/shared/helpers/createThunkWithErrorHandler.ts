import { createAsyncThunk } from '@reduxjs/toolkit'

import { parseErrorMessage } from './parseErrorMessage'

export function createThunkWithErrorHandler<Returned, ThunkArg>(
  typePrefix: string,
  payloadCreator: (arg: ThunkArg) => Promise<Returned>
) {
  return createAsyncThunk<Returned, ThunkArg>(
    typePrefix,
    async (arg, { rejectWithValue }) => {
      try {
        return await payloadCreator(arg)
      } catch (err) {
        return rejectWithValue(parseErrorMessage(err))
      }
    }
  )
}
