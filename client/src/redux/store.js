import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth'
import tagsReducer from './slices/tags'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tags: tagsReducer,
  },
})