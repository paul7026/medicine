import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { adminsReducer } from '@entities/admins'
import { authReducer } from '@entities/auth'
import { clinicsReducer } from '@entities/clinics'
import { documentsReducer } from '@entities/documents'
import { employeesReducer } from '@entities/employees'
import { favourCategoriesReducer } from '@entities/favourCategory'
import { favoursReducer } from '@entities/favours'
import { filialsReducer } from '@entities/filials'
import { promptsReducer } from '@entities/prompts'
import { usersReducer } from '@entities/users'

const rootReducer = combineReducers({
  authReducer,
  adminsReducer,
  usersReducer,
  clinicsReducer,
  filialsReducer,
  promptsReducer,
  employeesReducer,
  favoursReducer,
  favourCategoriesReducer,
  documentsReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
