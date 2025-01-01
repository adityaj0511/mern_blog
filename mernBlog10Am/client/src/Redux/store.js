
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from "./auth/authSlice"
import { persistStore, persistReducer } from 'redux-persist'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'  

const rootReducer=combineReducers({
    auth:authReducer
  
})

const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store =configureStore({
    reducer:persistedReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export const persistor = persistStore(store);