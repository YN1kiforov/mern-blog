import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth'
import tagsReducer from './slices/tags'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tags: tagsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch