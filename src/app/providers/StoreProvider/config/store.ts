import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { adminsReducer } from '@entities/admins'
import { authReducer } from '@entities/auth'
import { usersReducer } from '@entities/users'

const rootReducer = combineReducers({
  authReducer,
  adminsReducer,
  usersReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
